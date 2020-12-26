const { Label } = require('../components')
const { CustomWindowOverlay } = require('../window/customWindowOverlay')

var WindowOverlayFactory = class WindowOverlayFactory {
  constructor (windowSelector, logger, settings) {
    this.windowSelector = windowSelector
    this.logger = logger
    this.settings = settings
  }

  create (window) {
    const label = new Label(this.settings, window)

    return new CustomWindowOverlay(
      this.logger,
      this.windowSelector,
      label,
      window,
      window.metaWindow,
      3,
      this.settings
    )
  }
}

module.exports = { WindowOverlayFactory }
