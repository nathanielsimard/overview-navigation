var CustomWindowOverlay = class CustomWindowOverlay {
  constructor (logger, windowSelector, label, windowClone, metaWindow, padding, settings) {
    this.logger = logger
    this.windowSelector = windowSelector
    this.windowClone = windowClone
    this.label = label
    this.padding = padding
    this.metaWindow = metaWindow
    this.settings = settings

    this.label.updateFontColor(this.settings.getFontColor())
    windowSelector.registerWindow(metaWindow, function (name) {
      label.setText(name)
    })
  }

  relayout (animate) {
    let [x, y] = this.windowClone.slot
    this.logger.debug(`Calculating layout with x ${x} y ${y}...`)
    this.label.setPosition(Math.floor(x) + this.padding, Math.floor(y) + this.padding)
  }

  _onDestroy () {
    this.logger.info('Destroying ...')
    this.label.destroy()
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
