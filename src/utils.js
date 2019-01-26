const Main = imports.ui.main;
const Clutter = imports.gi.Clutter;

const DEBUG = true;


class Logger {
    constructor(name) {
        this.name = name;
        this.extensionName = 'Overview Navigation';
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

class Inject {
    constructor(parent, name, func) {
        this.name = name;
        this.func = func;
        this.parent = parent;
        this.origin = this.parent[name];
    }

    enable() {
        if (this.origin === undefined) {
            this._injectNewFunc();
        } else {
            this._injectExistingFunc(this.func, this.origin);
        }
    }

    _injectNewFunc() {
        this.parent[this.name] = this.func;
    }

    _injectExistingFunc(func, origin) {
        this.parent[this.name] = function () {
            const originRet = origin.apply(this, arguments);
            const newRet = func.apply(this, arguments);

            if (originRet === undefined) {
                return newRet;
            }

            return originRet;
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
        this.logger.info('Disabling search ...');

        Main.overview._controls.viewSelector.startSearch = function (event) { };
        Main.overview._controls.viewSelector._onTextChanged = function (se, prop) { };
    }

    enable() {
        this.logger.info('Enabling search ...');

        Main.overview._controls.viewSelector.startSearch = this.originalSearch;
        Main.overview._controls.viewSelector._onTextChanged = this.originalOnTextChanged;
    }
}

const IGNORE_KEYS = {}
IGNORE_KEYS[Clutter.KEY_j] = 'j';
IGNORE_KEYS[Clutter.KEY_k] = 'k';

const KEYS = {};
KEYS[Clutter.KEY_a] = 'a';
KEYS[Clutter.KEY_b] = 'b';
KEYS[Clutter.KEY_c] = 'c';
KEYS[Clutter.KEY_d] = 'd';
KEYS[Clutter.KEY_e] = 'e';
KEYS[Clutter.KEY_f] = 'f';
KEYS[Clutter.KEY_g] = 'g';
KEYS[Clutter.KEY_h] = 'h';
KEYS[Clutter.KEY_i] = 'i';
KEYS[Clutter.KEY_j] = 'j';
KEYS[Clutter.KEY_k] = 'k';
KEYS[Clutter.KEY_l] = 'l';
KEYS[Clutter.KEY_m] = 'm';
KEYS[Clutter.KEY_n] = 'n';
KEYS[Clutter.KEY_o] = 'o';
KEYS[Clutter.KEY_p] = 'p';
KEYS[Clutter.KEY_q] = 'q';
KEYS[Clutter.KEY_r] = 'r';
KEYS[Clutter.KEY_s] = 's';
KEYS[Clutter.KEY_t] = 't';
KEYS[Clutter.KEY_u] = 'u';
KEYS[Clutter.KEY_v] = 'v';
KEYS[Clutter.KEY_w] = 'w';
KEYS[Clutter.KEY_x] = 'x';
KEYS[Clutter.KEY_y] = 'y';
KEYS[Clutter.KEY_z] = 'z';

function _removeIngoreKeys() {
    const keys = Object.keys(IGNORE_KEYS);
    for (let i = 0; i < keys.length; i++) {
        delete KEYS[keys[i]];
    }
}

_removeIngoreKeys();