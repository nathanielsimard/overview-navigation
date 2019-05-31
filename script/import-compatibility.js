const glob = require('glob')
const fs = require('fs')

const replaceExtensionFileImport = importLine => {
  return importLine
    .replace('./', 'OverviewNavigation.imports.')
    .replace(/\//g, '.')
    .replace("require('", '')
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
    let addExtensionImport = false

    contents
      .split('\n')
      .filter(string => string.includes('require'))
      .forEach(i => {
        let final
        if (i.includes("require('.")) {
          addExtensionImport = true
          final = replaceExtensionFileImport(i)
        } else {
          if (i.includes("require('Extension')")) {
            addExtensionImport = true
            final = 'const Extension = OverviewNavigation'
          } else {
            final = replaceGnomeFileImport(i)
          }
        }
        newContents = newContents.replace(i, final)
      })
    if (addExtensionImport) {
      newContents = `const ExtensionUtils = imports.misc.extensionUtils
const OverviewNavigation = ExtensionUtils.getCurrentExtension()
${newContents}`
    }
    fs.writeFileSync(fileName, newContents)
  })
}

glob('build/**/*.js', {}, (err, files) => {
  if (err) {
    throw Error(err)
  }
  files.forEach(f => replaceImportsInFile(f))
})
