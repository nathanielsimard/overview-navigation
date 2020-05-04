var CustomWindowOverlay = class CustomWindowOverlay {
  constructor (logger, windowSelector, label, windowClone, metaWindow, padding, overlays, settings) {
    this.logger = logger
    this.logger.debug('Initializing ...')
    this.windowSelector = windowSelector
    this.windowClone = windowClone
    this.label = label
    this.padding = padding
    this.metaWindow = metaWindow
    this.overlays = overlays
    this.settings = settings

    this.label.updateFontColor(this.settings.getFontColor())
    windowSelector.registerWindow(metaWindow, function (name) {
      label.setText(name)
    })
  }

  relayout (animate) {
    let [x, y] = this.windowClone.slot
    this.logger.debug('Calculating layout ...')
    this.label.setPosition(Math.floor(x) + this.padding, Math.floor(y) + this.padding)
  }

  _onDestroy () {
    this.logger.info('Destroying ...')
    this.label.destroy()
    this.overlays.removeWindow(this)
  }

  showTooltip () {
    this.logger.debug('Showing tooltip ...')
    this.label.show()
  }

  showTooltipClosing () {
    this.label.updateFontColor(this.settings.getClosingFontColor())
    this.label.setText(this.label.getText().toUpperCase())
  }

  hideTooltipClosing () {
    this.label.updateFontColor(this.settings.getFontColor())
    this.label.setText(this.label.getText().toLowerCase())
  }

  hideTooltip () {
    this.logger.debug('Hiding tooltip ...')
    this.label.hide()
  }
}

module.exports = {
  CustomWindowOverlay
}
