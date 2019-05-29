/* global imports */
const ExtensionUtils = imports.misc.extensionUtils
const OverviewNavigation = ExtensionUtils.getCurrentExtension()

const Injector = OverviewNavigation.imports.injector
const Utils = OverviewNavigation.imports.utils
const Search = OverviewNavigation.imports.search
const Settings = OverviewNavigation.imports.settings
const KeySymbols = OverviewNavigation.imports.keySymbols
const CustomWindowManager = OverviewNavigation.imports.customWindowManager
const WindowSelector = OverviewNavigation.imports.windowSelector
const CustomWindowOverlay = OverviewNavigation.imports.customWindowOverlay
const CustomWorkspaceView = OverviewNavigation.imports.customWorkspaceView
const CustomWindowOverlays = OverviewNavigation.imports.customWindowOverlays

class Main {
  constructor () {
    const keySymbols = KeySymbols.initialize()
    const settings = Settings.initialize()
    const overlays = new CustomWindowOverlays.CustomWindowOverlays(
      new Utils.Logger('CustomWindowOverlays', settings)
    )

    const windowSelector = WindowSelector.create(
      keySymbols.keySymbols,
      new Utils.Logger('WindowSelector', settings)
    )

    this.search = Search.initialize()
    this.injector = new Injector.Injector(
      new Utils.Logger('Injector', settings)
    )

    CustomWindowManager.initialize(this.injector, this.search, settings)
    CustomWindowOverlay.initialize(
      this.injector,
      windowSelector,
      new Utils.Logger('CustomWindowOverlay', settings),
      overlays
    )

    CustomWorkspaceView.initialize(
      this.injector,
      new Utils.Logger('CustomWorkspaceView', settings),
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
  module.export = { Main }
}
