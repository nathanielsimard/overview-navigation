const KEYS = {};
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

class CustomWorkspaceView {
    constructor(customWindowOverlay, search) {
        this.logger = new Logger('CustomWorkspaceView');
        this.customWindowOverlay = customWindowOverlay;
        this.search = search;
    }

    enable() {
        this._init(this.logger, this.search);
        this._onDestroy(this.logger);
        this._onKeyPress(this.customWindowOverlay, this.logger);
        this._onKeyRelease(this.logger);
        this._hideTooltips(this.logger);
    }

    disable() {
        delete WorkspacesView.WorkspacesView.prototype.onKeyPress;
        delete WorkspacesView.WorkspacesView.prototype.onKeyRelease;
        delete WorkspacesView.WorkspacesView.prototype.hideTooltips;

        WorkspacesView.WorkspacesView.prototype._init = this.originalInit;
        WorkspacesView.WorkspacesView.prototype._onDestroy = this.originalOnDestroy;
    }

    _init(logger, search) {
        this.originalInit = injectToFunction(WorkspacesView.WorkspacesView.prototype, '_init', function (width, height, x, y, workspaces) {
            logger.info('Initializing ...');

            this.workspaceIndex = -1;
            this.windowIndex = -1;
            this.search = search;
            this.keyPressEventId = global.stage.connect('key-press-event', this.onKeyPress.bind(this));
            this.keyReleaseEventId = global.stage.connect('key-release-event', this.onKeyRelease.bind(this));
        });
    }

    _onDestroy(logger) {
        this.originalOnDestroy = injectToFunction(WorkspacesView.WorkspacesView.prototype, '_onDestroy', function () {
            logger.info('Destroying ...');

            global.stage.disconnect(this.keyPressEventId);
            global.stage.disconnect(this.keyReleaseEventId);
        });
    }

    _onKeyPress(customWindowOverlay, logger) {
        WorkspacesView.WorkspacesView.prototype.onKeyPress = function (s, o) {
            logger.info('On key press ...');

            if (Main.overview.viewSelector._activePage != Main.overview.viewSelector._workspacesPage)
                return false;

            let key = KEYS[o.get_key_symbol()];
            logger.debug(`Pressed key ${key}`);
            if (key != undefined) {
                logger.debug(`Workspace index : ${this.workspaceIndex} Window index : ${this.windowIndex}`);
                if (this.workspaceIndex == -1) {
                    logger.debug(`Choosed workspace #${key}`);
                    this.workspaceIndex = key;
                } else if (this.windowIndex == -1) {
                    if (this._workspaces[this.workspaceIndex].monitorIndex != 0) {
                        return false;
                    }
                    logger.debug(`Choosed window #${key}`);
                    this.windowIndex = key;
                } else {
                    logger.debug(`Choosed monitor #${key}`);
                    if (this._workspaces[this.workspaceIndex].monitorIndex != 0) {
                        return false;
                    }

                    const wTag = `${this.workspaceIndex}${this.windowIndex}${key}`;
                    const selectedWindow = customWindowOverlay.selectedWindows[wTag];
                    logger.debug(`WWWW for tag ${wTag} - ${selectedWindow}`);

                    const time = global.get_current_time();
                    selectedWindow.activate(time);


                    this.hideTooltips();
                    Main.overview.hide();
                    return true;
                }
            }

            if ((o.get_key_symbol() == Clutter.KEY_Alt_L || o.get_key_symbol() == Clutter.KEY_Alt_R)) {
                this.search.disable();
                for (let i = 0; i < this._workspaces.length; i++) {
                    this._workspaces[i].showWindowsTooltips();
                }
            }
            return false;
        }
    }

    _onKeyRelease(logger) {
        WorkspacesView.WorkspacesView.prototype.onKeyRelease = function (s, o) {
            logger.info('On key release ...');

            this._prevFocusActor = global.stage.get_key_focus();
            if (o.get_key_symbol() == Clutter.KEY_Alt_L || o.get_key_symbol() == Clutter.KEY_Alt_R) {
                this.hideTooltips();
            }
        }
    }

    _hideTooltips(logger) {
        WorkspacesView.WorkspacesView.prototype.hideTooltips = function () {
            logger.info('Hiding tooltips ...');

            if (global.stage.get_key_focus() == global.stage)
                global.stage.set_key_focus(this._prevFocusActor);

            this.workspaceIndex = -1;
            this.windowIndex = -1;
            this.search.enable();
            for (let i = 0; i < this._workspaces.length; i++)
                this._workspaces[i].hideWindowsTooltips();
        }

    }
}