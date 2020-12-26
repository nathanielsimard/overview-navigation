// The class that creates the CustomWindowOverlays.
var CustomWorkspace = class CustomWorkspace {
  constructor (logger, overlays, windowOverlayFactory, parent) {
    this.logger = logger
    this.overlays = overlays
    this.windowOverlayFactory = windowOverlayFactory
    this.parent = parent
  }

  _addWindowClone (metaWindow) {
    this.logger.info('Creating window')

    // Last window is always the cloned one.
    const windowIndex = this.parent._windows.length - 1
    const window = this.parent._windows[windowIndex]
    const overlay = this.windowOverlayFactory.create(window)

    window.connect('destroy', () => {
      this.overlays.removeWindow(overlay)
    })

    this.overlays.addWindow(overlay)
  }
}

module.exports = { CustomWorkspace }
