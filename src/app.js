const { CustomWindowOverlaySubject } = require('./subject/customWindowOverlaySubject')
const { Injector } = require('./injector')
const { Logger } = require('./utils')
const { TagGenerator } = require('./tagGenerator')
const Settings = require('./settings')
const { NATURAL_ORDERING, LOWER_CASE_KEY_SYMBOLS, UPPER_CASE_KEY_SYMBOLS } = require('./keySymbols')
const {
  initializeWindowManager,
  initializeWindowOverlay,
  initializeWorkspaceView,
  initializeSearch
} = require('./bootstrap/customComponents')
const WindowSelector = require('./window/windowSelector')

class Main {
  constructor () {
    const keySymbols = { ...LOWER_CASE_KEY_SYMBOLS, ...UPPER_CASE_KEY_SYMBOLS }
    const settings = Settings.initialize()
    const overlays = new CustomWindowOverlaySubject(new Logger('CustomWindowOverlays', settings))

    const tagGenerator = new TagGenerator(keySymbols, NATURAL_ORDERING)
    const windowSelector = WindowSelector.create(keySymbols, tagGenerator, new Logger('WindowSelector', settings))

    this.search = initializeSearch()
    this.injector = new Injector(new Logger('Injector', settings))

    initializeWindowManager(this.injector, this.search, settings)
    initializeWindowOverlay(this.injector, windowSelector, new Logger('CustomWindowOverlay', settings), overlays)

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
