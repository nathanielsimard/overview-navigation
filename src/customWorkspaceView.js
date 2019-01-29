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
    constructor(customWindowOverlay) {
        this.logger = new Logger('CustomWorkspaceView');
        this.customWindowOverlay = customWindowOverlay;
    }

    enable() {
        this.workspaceIndex = -1;
        this.windowIndex = -1;

        this._init(this.logger);
        this._onDestroy(this.logger);
        this._onKeyPress(this.workspaceIndex, this.windowIndex, this.customWindowOverlay, this.disableSearch, this.logger);
        this._onKeyRelease(this.logger);
        this._hideTooltips(this.workspaceIndex, this.windowIndex, this.enableSearch, this.logger);
    }

    disable() {
        delete WorkspacesView.WorkspacesView.prototype.onKeyPress;
        delete WorkspacesView.WorkspacesView.prototype.onKeyRelease;
        delete WorkspacesView.WorkspacesView.prototype.hideTooltips;

        WorkspacesView.WorkspacesView.prototype._init = this.originalInit;
        WorkspacesView.WorkspacesView.prototype._onDestroy = this.originalOnDestroy;
    }

    _init(logger) {
        this.originalInit = injectToFunction(WorkspacesView.WorkspacesView.prototype, '_init', function (width, height, x, y, workspaces) {
            logger.debug('Initializing ...');

            this.keyPressEventId = global.stage.connect('key-press-event', this.onKeyPress.bind(this));
            this.keyReleaseEventId = global.stage.connect('key-release-event', this.onKeyRelease.bind(this));
        });
    }

    _onDestroy(logger) {
        this.originalOnDestroy = injectToFunction(WorkspacesView.WorkspacesView.prototype, '_onDestroy', function () {
            logger.debug('Destroying ...');

            global.stage.disconnect(this.keyPressEventId);
            global.stage.disconnect(this.keyReleaseEventId);
        });
    }

    _onKeyPress(workspaceIndex, windowIndex, customWindowOverlay, disableSearch, logger) {
        WorkspacesView.WorkspacesView.prototype.onKeyPress = function (s, o) {
            logger.debug('On key press ...');
            if (Main.overview.viewSelector._activePage != Main.overview.viewSelector._workspacesPage)
                return false;

            let key = KEYS[o.get_key_symbol()];
            logger.debug(`Pressed key ${key}`);
            if (key != undefined) {
                logger.debug(`Workspace index : ${workspaceIndex} Window index : ${windowIndex}`);
                if (workspaceIndex == -1) {
                    logger.debug(`Choosed workspace #${key}`);
                    workspaceIndex = key;
                } else if (windowIndex == -1) {
                    if (this._workspaces[workspaceIndex].monitorIndex != 0) {
                        return false;
                    }
                    logger.debug(`Choosed window #${key}`);
                    windowIndex = key;
                } else {
                    logger.debug(`Choosed monitor #${key}`);
                    if (this._workspaces[workspaceIndex].monitorIndex != 0) {
                        return false;
                    }

                    const wTag = `${workspaceIndex}${windowIndex}${key}`;
                    const selectedWindow = customWindowOverlay.selectedWindows[wTag];
                    logger.debug(`WWWW for tag ${wTag} - ${selectedWindow}`);

                    const time = global.get_current_time();
                    selectedWindow.activate(time);


                    this._hideTooltips();
                    Main.overview.hide();
                    return true;
                }
            }

            if ((o.get_key_symbol() == Clutter.KEY_Alt_L || o.get_key_symbol() == Clutter.KEY_Alt_R)) {
                disableSearch();
                for (let i = 0; i < this._workspaces.length; i++) {
                    this._workspaces[i].showWindowsTooltips();
                }
            }
            return false;
        }
    }

    _onKeyRelease(logger) {
        WorkspacesView.WorkspacesView.prototype.onKeyRelease = function (s, o) {
            logger.debug('On key release ...');

            this._prevFocusActor = global.stage.get_key_focus();
            if (o.get_key_symbol() == Clutter.KEY_Alt_L || o.get_key_symbol() == Clutter.KEY_Alt_R) {
                this._hideTooltips();
            }
        }
    }
    _hideTooltips(workspaceIndex, windowIndex, enableSearch, logger) {
        WorkspacesView.WorkspacesView.prototype.hideTooltips = function () {
            logger.debug('Hiding tooltips ...');

            if (global.stage.get_key_focus() == global.stage)
                global.stage.set_key_focus(this._prevFocusActor);

            workspaceIndex = -1;
            windowIndex = -1;
            enableSearch();
            for (let i = 0; i < this._workspaces.length; i++)
                this._workspaces[i].hideWindowsTooltips();
        }

    }
    disableSearch() {
        Main.overview._controls.viewSelector.startSearch = function (event) { };
        Main.overview._controls.viewSelector._onTextChanged = function (se, prop) { };
    }

    enableSearch() {
        Main.overview._controls.viewSelector.startSearch = this.SavedstartSearch;
        Main.overview._controls.viewSelector._onTextChanged = this.SavedonTextChanged;
    }
}