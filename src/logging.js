class Logger {
    constructor(name) {
        this.name = name;
        this.extensionName = 'Multi Monitors Overview Navigation';
    }

    info(message) {
        this._log('INFO', message);
    }

    error(message) {
        this._log('ERROR', message);
    }

    debug(message) {
        this._log('DEBUG', message);
    }

    _log(tag, message) {
        global.log(`${tag} - [${this.extensionName} - ${this.name}]`, message);
    }
}