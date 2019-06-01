const { WindowManager } = require('ui/windowManager')
const Main = require('ui/main')
const { CustomWindowManager } = require('../customWindowManager')

const initialize = (injector, search, settings) => {
  injector.inject(CustomWindowManager, WindowManager, parent => {
    return new CustomWindowManager(search, Main.overview, settings)
  })
}

module.exports = { initialize }
