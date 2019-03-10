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
const CustomWorkspace = OverviewNavigation.imports.customWorkspace
const CustomWindowOverlay = OverviewNavigation.imports.customWindowOverlay
const CustomWorkspaceView = OverviewNavigation.imports.customWorkspaceView

class Main {
  constructor () {
    const keySymbols = KeySymbols.initialize()
    const settings = Settings.initialize()
    const windowSelector = new WindowSelector.WindowSelector(
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
      new Utils.Logger('CustomWindowOverlay', settings)
    )
    CustomWorkspace.initialize(
      this.injector,
      new Utils.Logger('CustomWorkspace', settings)
    )

    CustomWorkspaceView.initialize(
      this.injector,
      new Utils.Logger('CustomWorkspaceView', settings),
      this.search,
      windowSelector,
      keySymbols,
      settings
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
