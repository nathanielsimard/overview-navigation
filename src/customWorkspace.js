class CustomWorkspace {
  constructor (logger, windowOverlays) {
    this.logger = logger
    this.windowOverlays = windowOverlays
  }

  showWindowsTooltips () {
    this.logger.debug('Showing windows tooltips ...')

    for (let i in this.windowOverlays) {
      if (this.windowOverlays[i] != null) this.windowOverlays[i].showTooltip()
    }
  }

  showWindowsTooltipsClosing () {
    this.logger.debug('Showing windows tooltips closing ...')

    for (let i in this.windowOverlays) {
      if (this.windowOverlays[i] != null) {
        this.windowOverlays[i].showTooltipClosing()
      }
    }
  }

  hideWindowsTooltipsClosing () {
    this.logger.debug('Showing windows tooltips closing ...')

    for (let i in this.windowOverlays) {
      if (this.windowOverlays[i] != null) {
        this.windowOverlays[i].hideTooltipClosing()
      }
    }
  }

  hideWindowsTooltips () {
    this.logger.debug('Hiding windows tooltips ...')

    for (let i in this.windowOverlays) {
      if (this.windowOverlays[i] != null) this.windowOverlays[i].hideTooltip()
    }
  }
}

if (!global.overviewNavigationTesting) {
  /* global imports */
  const Workspace = imports.ui.workspace

  /*eslint-disable */
  function initialize(injector, logger) {
    /* eslint-enable */
    injector.inject(CustomWorkspace, Workspace.Workspace, parent => {
      return new CustomWorkspace(logger, parent._windowOverlays)
    })
  }
} else {
  module.exports = { CustomWorkspace }
}
