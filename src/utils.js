export var Logger = class Logger {
  constructor (name, settings) {
    this.settings = settings
    this.name = name
    this.extensionName = 'Overview Navigation'
    this._out = console.log
    this._outError = console.error
  }

  info (message) {
    if (this.settings && !this.settings.isLogging()) {
      return
    }

    this._log('INFO', message)
  }

  error (message) {
    this._logError(message)
  }

  debug (message) {
    if (this.settings && !this.settings.isLogging()) {
      return
    }

    this._log('DEBUG', message)
  }

  _log (tag, message) {
    this._out(`${tag} - [${this.extensionName} - ${this.name}] ${message}`)
  }

  _logError (message) {
    this._outError(`ERROR - [${this.extensionName} - ${this.name}] ${message}`)
  }
}

/*eslint-disable */
export var PrefLogger = class PrefLogger extends Logger {
  /* eslint-enable */
  constructor (name, settings) {
    super(name, settings)
    /* global log */
    this._out = log
  }
}
