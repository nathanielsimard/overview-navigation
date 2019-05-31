const fs = require('fs')

const replaceExtensionFileImport = importLine => {
  return importLine
    .replace('./', 'OverviewNavigation.imports.')
    .replace(/\//g, '.')
    .replace("require('", '')
    .replace("')", '')
}

const replaceGnomeFileImport = importLine => {
  return importLine.replace("require('", 'imports.').replace("')", '')
}

const fileName = 'src/app.js'
fs.readFile(fileName, 'utf8', (err, contents) => {
  if (err) {
    throw Error(err)
  }

  let newContents = `const ExtensionUtils = imports.misc.extensionUtils
const OverviewNavigation = ExtensionUtils.getCurrentExtension()
${contents}`

  contents
    .split('\n')
    .filter(string => string.includes('require'))
    .forEach(i => {
      let final
      if (i.includes("require('.")) {
        final = replaceExtensionFileImport(i)
      } else {
        final = replaceGnomeFileImport(i)
      }
      newContents = newContents.replace(i, final)
    })
  console.log(newContents)
  fs.writeFile(fileName, newContents)
})
