const {
  CustomWindowOverlaySubject
} = require('./subject/customWindowOverlaySubject')
const { Injector } = require('./injector')
const { Logger } = require('./utils')
const Settings = require('./settings')
const KeySymbols = require('./keySymbols')
const {
  initializeWindowManager,
  initializeWindowOverlay,
  initializeWorkspaceView,
  initializeSearch
} = require('./bootstrap/customComponents')
const WindowSelector = require('./window/windowSelector')

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

    this.search = initializeSearch()
    this.injector = new Injector(new Logger('Injector', settings))

    initializeWindowManager(this.injector, this.search, settings)
    initializeWindowOverlay(
      this.injector,
      windowSelector,
      new Logger('CustomWindowOverlay', settings),
      overlays
    )

    initializeWorkspaceView(
      this.injector,
      new Logger('CustomWorkspaceView', settings),
      this.search,
      windowSelector,
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

module.exports = { Main }
