import { CustomWindowOverlaySubject } from './subject/customWindowOverlaySubject.js'
import { Injector } from './injector.js'
import { Logger } from './utils.js'
import { TagGenerator } from './tagGenerator.js'
import { NATURAL_ORDERING, LOWER_CASE_KEY_SYMBOLS, UPPER_CASE_KEY_SYMBOLS } from './keySymbols.js'
import { initializeWindowManager, initializeWorkspaceView, initializeWorkspace, initializeSearch } from './bootstrap/customComponents.js'

import { WindowOverlayFactory } from './window/windowOverlayFactory.js'

import { create } from './window/windowSelector.js'

export var Main = class Main {
  constructor (settings) {
    const keySymbols = { ...LOWER_CASE_KEY_SYMBOLS, ...UPPER_CASE_KEY_SYMBOLS }

    const tagGenerator = new TagGenerator(keySymbols, NATURAL_ORDERING)
    const windowSelector = create(keySymbols, tagGenerator, new Logger('WindowSelector', settings))
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
