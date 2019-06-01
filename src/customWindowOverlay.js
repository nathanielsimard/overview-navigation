const CLOSING_WINDOW_STYLE =
  'extension-overview-navigation-window-tooltip-closing'
const FOCUS_WINDOW_STYLE = 'extension-overview-navigation-window-tooltip'

class CustomWindowOverlay {
  constructor (
    logger,
    windowSelector,
    label,
    parentActor,
    windowClone,
    metaWindow,
    padding,
    overlays
  ) {
    this.logger = logger
    this.logger.debug('Initializing ...')
    this.windowSelector = windowSelector
    this.windowClone = windowClone
    this.label = label
    this.padding = padding
    this.metaWindow = metaWindow
    this.overlays = overlays

    parentActor.add_actor(label)
    windowSelector.registerWindow(metaWindow, function (name) {
      label.text = name
    })
  }

  relayout (animate) {
    let [x, y] = this.windowClone.slot
    this.logger.debug('Calculating layout ...')
    this.label.set_position(
      Math.floor(x) + this.padding,
      Math.floor(y) + this.padding
    )
  }

  _onDestroy () {
    this.logger.info('Destroying ...')
    this.label.destroy()
    this.overlays.removeWindow(this)
  }

  showTooltip () {
    this.logger.debug('Showing tooltip ...')
    this.label.raise_top()
    this.label.show()
  }

  showTooltipClosing () {
    this.label.set_style_class_name(CLOSING_WINDOW_STYLE)

    this.label.text = this.label.text.toUpperCase()
  }

  hideTooltipClosing () {
    this.label.set_style_class_name(FOCUS_WINDOW_STYLE)

    this.label.text = this.label.text.toLowerCase()
  }

  hideTooltip () {
    this.logger.debug('Hiding tooltip ...')
    this.label.hide()
  }
}

if (!global.overviewNavigationTesting) {
  const St = require('gi/St')
  const Workspace = require('ui/workspace')

  /*eslint-disable */
  function initialize(injector, windowSelector, logger, overlays) {
    /* eslint-enable */
    injector.inject(CustomWindowOverlay, Workspace.WindowOverlay, parent => {
      const label = new St.Label({})
      label.set_style_class_name(FOCUS_WINDOW_STYLE)
      const customWindow = new CustomWindowOverlay(
        logger,
        windowSelector,
        label,
        parent._parentActor,
        parent._windowClone,
        parent._windowClone.metaWindow,
        3,
        overlays
      )
      overlays.addWindow(customWindow)
      return customWindow
    })
  }
} else {
  module.exports = {
    CustomWindowOverlay,
    CLOSING_WINDOW_STYLE,
    FOCUS_WINDOW_STYLE
  }
}
