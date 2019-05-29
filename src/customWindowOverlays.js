class CustomWindowOverlays {
  constructor (logger) {
    this.windows = []
    this.listeners = []
    this.logger = logger
  }

  onWindowCreated (window) {
    this.windows.push(window)
    this.listeners.forEach(lister => lister.onWindowCreated(window))
  }

  onWindowDeleted (window) {
    this.windows = this.windows.filter(w => w !== window)
    this.listeners.forEach(lister => lister.onWindowDeleted(window))
  }

  getAllWindows () {
    return this.windows
  }

  register (listener) {
    this.listeners.push(listener)
  }

  unRegister (listener) {
    this.listeners = this.listeners.filter(l => l !== listener)
  }
}

if (global.overviewNavigationTesting) {
  module.exports = { CustomWindowOverlays }
}
