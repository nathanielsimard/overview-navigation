const { MODE } = require('./mode')

var CustomWorkspaceView = class CustomWorkspaceView {
  constructor (logger, search, windowSelector, stage, workspaces, workspaceManager, keys, settings, overlays) {
    this.logger = logger
    this.search = search
    this.windowSelector = windowSelector
    this.stage = stage
    this.workspaces = workspaces
    this.workspaceManager = workspaceManager
    this.keys = keys
    this.settings = settings
    this.current_mode = MODE.Focussing
    this.overlays = overlays
    this.overlays.attach(this)
    this.searching = true
  }

  onWindowCreated (window) {
    this.logger.debug(`Window Created.. ${window}`)
    this.logger.debug(`Searching ${this.searching}`)

    if (this.searching) {
      window.hideTooltip()
    } else {
      window.showTooltip()
    }
  }
  onWindowDeleted (window) { }

  _updateWorkspaceMode () {
    this.logger.info('Animate to overview ...')

    if (!this.keyPressEventId) {
      this.keyPressEventId = this.stage.connect('key-press-event', this.onKeyPress.bind(this))
    }

    if (!this.keyReleaseEventId) {
      this.keyReleaseEventId = this.stage.connect('key-release-event', this.onKeyRelease.bind(this))
    }

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

    if (!this.isOnFirstMonitor()) return
    if (this.showWindowsTooltipsClosing(o.get_key_symbol())) return
    if (this.searching) return

    const keySymbol = o.get_key_symbol()
    this._selectWindow(keySymbol)
  }

  onKeyRelease (s, o) {
    this.logger.debug('On key release ...')

    if (this.hideWindowsTooltipsClosing(o.get_key_symbol())) return
    if (!this.isShowTooltipsKeySymbol(o.get_key_symbol())) return

    if (this.searching) {
      this.showTooltips()
    } else {
      this.hideTooltips()
    }
  }

  hideWindowsTooltipsClosing (keySymbol) {
    if (!this.isTooltipsClosingKeySymbol(keySymbol)) return false

    this.overlays.getAllWindows().forEach(window => {
      window.hideTooltipClosing()
    })

    this.current_mode = MODE.Focussing
    return true
  }

  showWindowsTooltipsClosing (keySymbol) {
    if (!this.isTooltipsClosingKeySymbol(keySymbol)) return false

    this.overlays.getAllWindows().forEach(window => {
      window.showTooltipClosing()
    })

    this.current_mode = MODE.Closing
    return true
  }

  isShowTooltipsKeySymbol (keySymbol) {
    return keySymbol === this.keys.KEY_space
  }

  isTooltipsClosingKeySymbol (keySymbol) {
    // Shift keySymbol become 0 when the option
    // 'Shift Cancels Capslock' is enable.
    return keySymbol === this.keys.KEY_Shift_L ||
      keySymbol === this.keys.KEY_Shift_R ||
      keySymbol === 0
  }

  isOnFirstMonitor () {
    const activeWorkspaceIndex = this.workspaceManager.get_active_workspace_index()
    return this.workspaces[activeWorkspaceIndex].monitorIndex === 0
  }

  showTooltips () {
    this.logger.debug('Showing tooltips ...')

    this.overlays.getAllWindows().forEach(window => {
      window.showTooltip()
    })

    this.search.disable()
    this.searching = false
  }

  hideTooltips () {
    this.logger.debug('Hiding tooltips ...')

    this.overlays.getAllWindows().forEach(window => {
      window.hideTooltip()
    })

    this.windowSelector.resetSelection()
    this.search.enable()
    this.searching = true
  }
  _selectWindow (keySymbol) {
    const selectedWindow = this.windowSelector.select(keySymbol, this.current_mode)
    if (selectedWindow) {
      selectedWindow.activate()
    }
  }
}

module.exports = { CustomWorkspaceView }
