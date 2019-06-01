const glob = require('glob')
const fs = require('fs')
const ExtensionTag = 'Extension'

const generateExtensionFileImports = imports => {
  return imports
    .filter(i => i.includes("require('."))
    .map(i => {
      return {
        newImport: i
          .replace("require('./", `${ExtensionTag}.imports.`)
          .replace(/\//g, '.')
          .replace("')", ''),
        oldImport: i
      }
    })
}

const generateGnomeFileImports = imports => {
  return imports
    .filter(i => !i.includes("require('."))
    .filter(i => !i.includes(`require('${ExtensionTag}')`))
    .map(i => {
      return {
        newImport: i
          .replace("require('", 'imports.')
          .replace(/\//g, '.')
          .replace("')", ''),
        oldImport: i
      }
    })
}

const generateExtensionTagImports = imports => {
  return imports
    .filter(i => i.includes(`require('${ExtensionTag}')`))
    .map(i => {
      return { newImport: '', oldImport: i }
    })
}

const addExtensionTag = contents => {
  return (
    'const ExtensionUtils = imports.misc.extensionUtils\n' +
    `const ${ExtensionTag} = ExtensionUtils.getCurrentExtension()\n` +
    contents
  )
}

const replaceImportsInFile = fileName => {
  console.log(`Replace imports in file ${fileName}`)
  let contents = fs.readFileSync(fileName, 'utf8')

  const imports = contents.split('\n').filter(line => line.includes('require'))
  const extensionImports = generateExtensionFileImports(imports)
  const gnomeImports = generateGnomeFileImports(imports)
  const extensionsTagImports = generateExtensionTagImports(imports)

  extensionImports
    .concat(gnomeImports)
    .concat(extensionsTagImports)
    .forEach(i => (contents = contents.replace(i.oldImport, i.newImport)))

  if (extensionImports.length > 0 || extensionsTagImports.length > 0) {
    contents = addExtensionTag(contents)
  }

  contents = contents.replace(/module.exports = {[^}]+}/, '')
  fs.writeFileSync(fileName, contents)
}

glob('build/**/*.js', {}, (err, files) => {
  if (err) {
    throw Error(err)
  }
  files.forEach(f => replaceImportsInFile(f))
})
