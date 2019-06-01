const glob = require('glob')
const fs = require('fs')
const ExtensionTag = 'Extension'

const replaceExtensionFileImport = importLine => {
  return importLine
    .replace("require('./", `${ExtensionTag}.imports.`)
    .replace(/\//g, '.')
    .replace("')", '')
}

const replaceGnomeFileImport = importLine => {
  return importLine
    .replace("require('", 'imports.')
    .replace(/\//g, '.')
    .replace("')", '')
}

const replaceImportsInFile = fileName => {
  console.log(`Replace imports in file ${fileName}`)
  fs.readFile(fileName, 'utf8', (err, contents) => {
    if (err) {
      throw Error(err)
    }

    let newContents = contents

    const imports = contents
      .split('\n')
      .filter(line => line.includes('require'))

    const extensionImports = imports
      .filter(i => i.includes("require('."))
      .map(i => {
        return {
          newImport: replaceExtensionFileImport(i),
          oldImport: i
        }
      })

    const gnomeImports = imports
      .filter(i => !i.includes("require('."))
      .filter(i => !i.includes(`require('${ExtensionTag}')`))
      .map(i => {
        return {
          newImport: replaceGnomeFileImport(i),
          oldImport: i
        }
      })

    let extensionImported = false
    imports
      .filter(i => i.includes(`require('${ExtensionTag}')`))
      .forEach(i => {
        newContents = newContents.replace(i, '')
        extensionImported = true
      })

    extensionImports.forEach(
      i => (newContents = newContents.replace(i.oldImport, i.newImport))
    )
    gnomeImports.forEach(
      i => (newContents = newContents.replace(i.oldImport, i.newImport))
    )
    if (extensionImports.length > 0 || extensionImported) {
      newContents =
        'const ExtensionUtils = imports.misc.extensionUtils\n' +
        `const ${ExtensionTag} = ExtensionUtils.getCurrentExtension()\n` +
        newContents
    }

    newContents
      .split('\n')
      .filter(line => line.includes('module.exports'))
      .forEach(line => (newContents = newContents.replace(line, '')))

    fs.writeFileSync(fileName, newContents)
  })
}

glob('build/**/*.js', {}, (err, files) => {
  if (err) {
    throw Error(err)
  }
  files.forEach(f => replaceImportsInFile(f))
})
