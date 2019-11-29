var Logger = class Logger {
  constructor(name, settings) {
    this.settings = settings
    this.name = name
    this.extensionName = 'Overview Navigation'
    this._out = global.log
  }

  info(message) {
    if (this.settings && !this.settings.isLogging()) {
      return
    }

    this._log('INFO', message)
  }

  error(message) {
    this._log('ERROR', message)
  }

  debug(message) {
    if (this.settings && !this.settings.isLogging()) {
      return
    }

    this._log('DEBUG', message)
  }

  _log(tag, message) {
    this._out(`${tag} - [${this.extensionName} - ${this.name}] ${message}`)
  }
}

/*eslint-disable */
var PrefLogger = class PrefLogger extends Logger {
  /* eslint-enable */
  constructor(name, settings) {
    super(name, settings)
    /* global log */
    this._out = log
  }
}

if (global.overviewNavigationTesting) {
  var TestLogger = class TestLogger extends Logger {
    constructor(name, logging) {
      super(name, {
        isLogging: () => logging
      })
      this._out = console.log
    }
  }

  module.exports = { TestLogger }
}
