const glob = require('glob')
const fs = require('fs')
const ExtensionTag = 'Extension'

const getImport = line => {
  const regex = /\([^)]+\)/
  const result = regex.exec(line)
  return result[0]
    .replace(/\(/g, '')
    .replace(/\)/g, '')
    .replace(/'/g, '')
}

const getRelativePath = (line, fileName, dots) => {
  const path = fileName.split('/')
  path.pop()
  dots.forEach(r => path.pop())
  return path
}
const generateExtensionFileImport = (line, fileName) => {
  const dots = line.match(/\.\./g) || []
  const path = getRelativePath(line, fileName, dots)

  let importLine = getImport(line)
  dots.forEach(r => (importLine = importLine.replace('../', '')))
  importLine = importLine.replace('./', '')
  while (path.length > 1) {
    importLine = `${path.pop()}/${importLine}`
  }
  importLine = `${ExtensionTag}/imports/${importLine}`
  return line.replace(/require\([^)]+\)/, importLine).replace(/(\/)/g, '.')
}

const generateExtensionFileImports = (imports, fileName) => {
  return imports
    .filter(i => i.includes("require('."))
    .map(i => {
      return {
        newImport: generateExtensionFileImport(i, fileName),
        oldImport: i
      }
    })
}

const generateGnomeFileImport = line => {
  return line
    .replace("require('", 'imports.')
    .replace(/\//g, '.')
    .replace("')", '')
}

const generateGnomeFileImports = imports => {
  return imports
    .filter(i => !i.includes("require('."))
    .filter(i => !i.includes(`require('${ExtensionTag}')`))
    .map(i => {
      return {
        newImport: generateGnomeFileImport(i),
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
  const extensionImports = generateExtensionFileImports(imports, fileName)
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
