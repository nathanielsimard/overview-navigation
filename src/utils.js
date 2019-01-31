KEYS = {};
KEYS[Clutter.KEY_0] = 0;
KEYS[Clutter.KEY_1] = 1;
KEYS[Clutter.KEY_2] = 2;
KEYS[Clutter.KEY_3] = 3;
KEYS[Clutter.KEY_4] = 4;
KEYS[Clutter.KEY_5] = 5;
KEYS[Clutter.KEY_6] = 6;
KEYS[Clutter.KEY_7] = 7;
KEYS[Clutter.KEY_8] = 8;
KEYS[Clutter.KEY_9] = 9;


class Override {
    constructor(parent, name, func) {
        this.name = name;
        this.func = func;
        this.parent = parent;
        this.origin = this.parent[name];
    }

    enable() {
        const func = this.func;
        const origin = this.origin;

        this.parent[this.name] = function () {
            let ret;
            ret = origin.apply(this, arguments);
            if (ret === undefined)
                ret = func.apply(this, arguments);
            return ret;
        }
    }

    disable() {
        this.parent[this.name] = this.origin;
    }

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
        if (!DEBUG) { return }

        this._log('DEBUG', message);
    }

    _log(tag, message) {
        global.log(`${tag} - [${this.extensionName} - ${this.name}]`, message);
    }
}