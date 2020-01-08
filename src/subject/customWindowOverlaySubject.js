var CustomWindowOverlaySubject = class CustomWindowOverlaySubject {
  constructor (logger) {
    this.windows = []
    this.listeners = []
    this.logger = logger
  }

  addWindow (window) {
    this.windows.push(window)
    this.listeners.forEach(lister => lister.onWindowCreated(window))
  }

  removeWindow (window) {
    this.windows = this.windows.filter(w => w !== window)
    this.listeners.forEach(lister => lister.onWindowDeleted(window))
  }

  getAllWindows () {
    return this.windows
  }

  attach (listener) {
    this.listeners.push(listener)
  }

  detach (listener) {
    this.listeners = this.listeners.filter(l => l !== listener)
  }
}

module.exports = { CustomWindowOverlaySubject }
