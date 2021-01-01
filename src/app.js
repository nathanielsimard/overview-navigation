const { CustomWindowOverlaySubject } = require('./subject/customWindowOverlaySubject')
const { Injector } = require('./injector')
const { Logger } = require('./utils')
const { TagGenerator } = require('./tagGenerator')
const { NATURAL_ORDERING, LOWER_CASE_KEY_SYMBOLS, UPPER_CASE_KEY_SYMBOLS } = require('./keySymbols')
const {
  initializeWindowManager,
  initializeWorkspaceView,
  initializeWorkspace,
  initializeSearch
} = require('./bootstrap/customComponents')

const { WindowOverlayFactory } = require('./window/windowOverlayFactory')

const Settings = require('./settings')
const WindowSelector = require('./window/windowSelector')

var Main = class Main {
  constructor () {
    const keySymbols = { ...LOWER_CASE_KEY_SYMBOLS, ...UPPER_CASE_KEY_SYMBOLS }
    const settings = Settings.initialize()

    const tagGenerator = new TagGenerator(keySymbols, NATURAL_ORDERING)
    const windowSelector = WindowSelector.create(keySymbols, tagGenerator, new Logger('WindowSelector', settings))
    const windowOverlayFactory = new WindowOverlayFactory(
      windowSelector,
      new Logger('Window Overlay', settings),
      settings
    )
    const overlays = new CustomWindowOverlaySubject(new Logger('CustomWindowOverlays', settings))

    this.search = initializeSearch(settings)

    this.injector = new Injector(new Logger('Injector', settings))

    initializeWindowManager(this.injector, this.search, settings)
    initializeWorkspace(this.injector, settings, overlays, windowOverlayFactory)
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
