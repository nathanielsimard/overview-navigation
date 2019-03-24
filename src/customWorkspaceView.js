class CustomWorkspaceView {
  constructor (
    logger,
    search,
    windowSelector,
    stage,
    workspaces,
    workspaceManager,
    keys,
    overview,
    keySymbols,
    settings
  ) {
    this.logger = logger
    this.search = search
    this.windowSelector = windowSelector
    this.stage = stage
    this.workspaces = workspaces
    this.workspaceManager = workspaceManager
    this.keys = keys
    this.overview = overview
    this.keySymbols = keySymbols
    this.settings = settings
  }

  _init () {
    this.logger.info('Initializing ...')

    this.keyPressEventId = this.stage.connect(
      'key-press-event',
      this.onKeyPress.bind(this)
    )
    this.keyReleaseEventId = this.stage.connect(
      'key-release-event',
      this.onKeyRelease.bind(this)
    )

    if (this.settings.isShowWindowSelectorWhenShowOverview()) {
      this.showTooltips()
    } else {
      this.hideTooltips()
    }
  }

  _onDestroy () {
    this.logger.info('On Destroy ...')

    this.stage.disconnect(this.keyPressEventId)
    this.stage.disconnect(this.keyReleaseEventId)

    this.windowSelector.reset()
    this.search.enable()
  }

  onKeyPress (s, o) {
    this.logger.debug('On key press ...')

    const keySymbol = o.get_key_symbol()

    if (!this.isOnFirstMonitor()) return
    if (this.searching) return
    if (this.windowSelector.select(keySymbol)) this.closeOverview()
  }

  onKeyRelease (s, o) {
    this.logger.debug('On key release ...')

    if (!this.isShowTooltipsKeySymbol(o.get_key_symbol())) return

    if (this.searching) {
      this.showTooltips()
    } else {
      this.hideTooltips()
    }
  }

  closeOverview () {
    this.windowSelector.reset()
    this.overview.hide()
  }

  isShowTooltipsKeySymbol (keySymbol) {
    return keySymbol === this.keys.KEY_space
  }

  isOnFirstMonitor () {
    const activeWorkspaceIndex = this.workspaceManager.get_active_workspace_index()
    return this.workspaces[activeWorkspaceIndex].monitorIndex === 0
  }

  showTooltips () {
    this.logger.debug('Showing tooltips ...')

    for (let i = 0; i < this.workspaces.length; i++) {
      this.workspaces[i].showWindowsTooltips()
    }

    this.search.disable()
    this.searching = false
  }

  hideTooltips () {
    this.logger.debug('Hiding tooltips ...')

    for (let i = 0; i < this.workspaces.length; i++) {
      this.workspaces[i].hideWindowsTooltips()
    }

    this.windowSelector.resetSelection()
    this.search.enable()
    this.searching = true
  }
}

if (!global.overviewNavigationTesting) {
  /* global imports */
  const Clutter = imports.gi.Clutter
  const WorkspacesView = imports.ui.workspacesView
  const Main = imports.ui.main

  /*eslint-disable */
  function initialize(
    injector,
    logger,
    search,
    windowSelector,
    keySymbols,
    settings
  ) {
    /* eslint-enable */
    injector.inject(
      CustomWorkspaceView,
      WorkspacesView.WorkspacesView,
      parent => {
        var workspaceManager = global.workspace_manager
        if (!workspaceManager) {
          workspaceManager = global.screen
        }

        return new CustomWorkspaceView(
          logger,
          search,
          windowSelector,
          global.stage,
          parent._workspaces,
          workspaceManager,
          Clutter,
          Main.overview,
          keySymbols.keySymbols,
          settings
        )
      }
    )
  }
} else {
  module.exports = { CustomWorkspaceView }
}
