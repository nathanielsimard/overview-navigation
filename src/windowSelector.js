const ExtensionUtils = imports.misc.extensionUtils;
const OverviewNavigation = ExtensionUtils.getCurrentExtension();

const Utils = OverviewNavigation.imports.utils;

const Clutter = imports.gi.Clutter;

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
//KEYS[Clutter.KEY_j] = 'j';
//KEYS[Clutter.KEY_k] = 'k';
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

class WindowSelector {
    constructor() {
        this.logger = new Utils.Logger('WindowSelector');
        this.reset();
        this._initTags();
    }

    select(keySymbol) {
        const key = KEYS[keySymbol];
        if (key == undefined) { return false; }

        this.selections = this.selections + key;

        if (this.selections.length == 1) { return false };

        this.logger.debug(`Selections ${this.selections}`);
        const selectedWindow = this.selectedWindows[this.selections];

        if (!selectedWindow) {
            this.selections = '';
            return false
        }

        const time = global.get_current_time();
        selectedWindow.activate(time);
        return true;
    }


    addWindow(window) {
        const tag = this.tags[this.index++];
        this.selectedWindows[tag] = window;
        return tag;
    }

    reset() {
        this.logger.debug('Resetting ...');
        this.selections = '';
        this.selectedWindows = {};
        this.index = 0;
    }

    _initTags() {
        const keys = Object.keys(KEYS);
        const n = keys.length;
        this.tags = [];

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i == j) { continue }
                this.tags.push(`${KEYS[keys[i]]}${KEYS[keys[j]]}`);
            }
        }
    }
}