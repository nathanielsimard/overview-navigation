function injectToFunction(parent, name, func) {
    let origin = parent[name];
    parent[name] = function () {
        let ret;
        ret = origin.apply(this, arguments);
        if (ret === undefined)
            ret = func.apply(this, arguments);
        return ret;
    }
    return origin;
}

class Search {
    constructor() {
        this.logger = new Logger('Search');
        this.originalSearch = Main.overview._controls.viewSelector.startSearch;
        this.originalOnTextChanged = Main.overview._controls.viewSelector._onTextChanged;
    }

    disable() {
        logger.info('Disabling search ...');

        Main.overview._controls.viewSelector.startSearch = function (event) { };
        Main.overview._controls.viewSelector._onTextChanged = function (se, prop) { };
    }

    enable() {
        logger.info('Enabling search ...');

        Main.overview._controls.viewSelector.startSearch = this.originalSearch;
        Main.overview._controls.viewSelector._onTextChanged = this.originalOnTextChanged;
    }
}
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
