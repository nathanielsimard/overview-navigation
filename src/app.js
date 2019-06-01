const {
  CustomWindowOverlaySubject
} = require('./subject/customWindowOverlaySubject')
const { Injector } = require('./injector')
const { Logger } = require('./utils')
const Search = require('./search')
const Settings = require('./settings')
const KeySymbols = require('./keySymbols')
const WindowManagerBootstrap = require('./bootstrap/windowManager')
const WindowSelector = require('./windowSelector')
const CustomWindowOverlay = require('./customWindowOverlay')
const CustomWorkspaceView = require('./customWorkspaceView')

class Main {
  constructor () {
    const keySymbols = KeySymbols.initialize()
    const settings = Settings.initialize()
    const overlays = new CustomWindowOverlaySubject(
      new Logger('CustomWindowOverlays', settings)
    )

    const windowSelector = WindowSelector.create(
      keySymbols.keySymbols,
      new Logger('WindowSelector', settings)
    )

    this.search = Search.initialize()
    this.injector = new Injector(new Logger('Injector', settings))

    WindowManagerBootstrap.initialize(this.injector, this.search, settings)
    CustomWindowOverlay.initialize(
      this.injector,
      windowSelector,
      new Logger('CustomWindowOverlay', settings),
      overlays
    )

    CustomWorkspaceView.initialize(
      this.injector,
      new Logger('CustomWorkspaceView', settings),
      this.search,
      windowSelector,
      keySymbols,
      settings,
      overlays
    )
  }

  start () {
    this.injector.enable()
  }

  stop () {
    this.injector.disable()
    this.search.enable()
  }
}

if (global.overviewNavigationTesting) {
  module.exports = { Main }
}
