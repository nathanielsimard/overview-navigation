function removeInjection(object, injection, name) {
    if (injection[name] === undefined)
        delete object[name];
    else
        object[name] = injection[name];
}

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


class Overview {
    constructor() {
        this.resetState();
        this.logger = new Logger('Overview');
    }

    enable() {
        let workspaceIndex = -1;
        let windowIndex = -1;

        const self = this;
        Workspace.WindowOverlay.prototype.showTooltip = function () {
            this._text.raise_top();
            this._text.show();
            const windowIndex = this._windowClone.slotId;
            const workspace = this._windowClone._workspace;
            const monitorIndex = workspace.monitorIndex;
            const workspaceIndex = workspace.metaWorkspace.index();
            const text = `${workspaceIndex}${windowIndex}${monitorIndex}`;
            this._text.text = text;
            self.selectedWindows[text] = this._windowClone.metaWindow;
        }
        this.winInjections['showTooltip'] = undefined;

        Workspace.WindowOverlay.prototype.hideTooltip = function () {
            if (this._text && this._text.visible)
                this._text.hide();
        }
        this.winInjections['hideTooltip'] = undefined;

        Workspace.Workspace.prototype.showWindowsTooltips = function () {
            for (let i in this._windowOverlays) {
                if (this._windowOverlays[i] != null)
                    this._windowOverlays[i].showTooltip();
            }
        }
        this.workspaceInjections['showWindowsTooltips'] = undefined;

        Workspace.Workspace.prototype.hideWindowsTooltips = function () {
            for (let i in this._windowOverlays) {
                if (this._windowOverlays[i] != null)
                    this._windowOverlays[i].hideTooltip();
            }
        }
        this.workspaceInjections['hideWindowsTooltips'] = undefined;

        WorkspacesView.WorkspacesView.prototype._hideTooltips = function () {
            if (global.stage.get_key_focus() == global.stage)
                global.stage.set_key_focus(this._prevFocusActor);
            this._pickWindow = false;
            workspaceIndex = -1;
            windowIndex = -1;
            self.enableSearch();
            for (let i = 0; i < this._workspaces.length; i++)
                this._workspaces[i].hideWindowsTooltips();
        }
        this.workViewInjections['_hideTooltips'] = undefined;


        WorkspacesView.WorkspacesView.prototype._onKeyRelease = function (s, o) {
            self.logger.debug('On key release');
            this._prevFocusActor = global.stage.get_key_focus();
            if (o.get_key_symbol() == Clutter.KEY_Alt_L || o.get_key_symbol() == Clutter.KEY_Alt_R) {
                this._hideTooltips();
            }
        }
        this.workViewInjections['_onKeyRelease'] = undefined;

        const binding = {};
        binding[Clutter.KEY_0] = 0;
        binding[Clutter.KEY_1] = 1;
        binding[Clutter.KEY_2] = 2;
        binding[Clutter.KEY_3] = 3;
        binding[Clutter.KEY_4] = 4;
        binding[Clutter.KEY_5] = 5;
        binding[Clutter.KEY_6] = 6;
        binding[Clutter.KEY_7] = 7;
        binding[Clutter.KEY_8] = 8;
        binding[Clutter.KEY_9] = 9;


        WorkspacesView.WorkspacesView.prototype._onKeyPress = function (s, o) {
            self.logger.debug('On key press');
            if (Main.overview.viewSelector._activePage != Main.overview.viewSelector._workspacesPage)
                return false;

            let key = binding[o.get_key_symbol()];
            self.logger.debug(`Pressed key ${key}`);
            if (key != undefined) {
                self.logger.debug(`Workspace index : ${workspaceIndex} Window index : ${windowIndex}`);
                if (workspaceIndex == -1) {
                    self.logger.debug(`Choosed workspace #${key}`);
                    workspaceIndex = key;
                } else if (windowIndex == -1) {
                    if (this._workspaces[workspaceIndex].monitorIndex != 0) {
                        return false;
                    }
                    self.logger.debug(`Choosed window #${key}`);
                    windowIndex = key;
                } else {
                    self.logger.debug(`Choosed monitor #${key}`);
                    if (this._workspaces[workspaceIndex].monitorIndex != 0) {
                        return false;
                    }

                    const wTag = `${workspaceIndex}${windowIndex}${key}`;
                    const selectedWindow = self.selectedWindows[wTag];
                    self.logger.debug(`WWWW for tag ${wTag} - ${selectedWindow}`);

                    const time = global.get_current_time();
                    selectedWindow.activate(time);


                    this._hideTooltips();
                    Main.overview.hide();
                    return true;
                }
            }

            if ((o.get_key_symbol() == Clutter.KEY_Alt_L || o.get_key_symbol() == Clutter.KEY_Alt_R)) {
                self.disableSearch();
                for (let i = 0; i < this._workspaces.length; i++) {
                    this._workspaces[i].showWindowsTooltips();
                }
            }
            return false;
        }
        this.workViewInjections['_onKeyPress'] = undefined;

        this.winInjections['_init'] = injectToFunction(Workspace.WindowOverlay.prototype, '_init', function (windowClone, parentActor) {
            this._id = null;
            self.createdActors.push(this._text = new St.Label({ style_class: 'extension-windowsNavigator-window-tooltip' }));
            this._text.hide();
            parentActor.add_actor(this._text);
        });

        this.winInjections['relayout'] = injectToFunction(Workspace.WindowOverlay.prototype, 'relayout', function (animate) {
            let [cloneX, cloneY, cloneWidth, cloneHeight] = this._windowClone.slot;

            let textX = cloneX - 2;
            let textY = cloneY - 2;
            this._text.set_position(Math.floor(textX) + 5, Math.floor(textY) + 5);
            this._text.raise_top();
        });

        this.workViewInjections['_init'] = injectToFunction(WorkspacesView.WorkspacesView.prototype, '_init', function (width, height, x, y, workspaces) {
            this._pickWorkspace = false;
            this._pickWindow = false;
            this._keyPressEventId =
                global.stage.connect('key-press-event', this._onKeyPress.bind(this));
            self.logger.debug(`keypressEvent id ${this._keyPressEventId}`);
            this._keyReleaseEventId =
                global.stage.connect('key-release-event', this._onKeyRelease.bind(this));
            self.connectedSignals.push({ obj: global.stage, id: this._keyPressEventId });
            self.connectedSignals.push({ obj: global.stage, id: this._keyReleaseEventId });

        });

        this.workViewInjections['_onDestroy'] = injectToFunction(WorkspacesView.WorkspacesView.prototype, '_onDestroy', function () {
            global.stage.disconnect(this._keyPressEventId);
            global.stage.disconnect(this._keyReleaseEventId);
            self.connectedSignals = [];
        });

        this.SavedstartSearch = Main.overview._controls.viewSelector.startSearch;
        this.SavedonTextChanged = Main.overview._controls.viewSelector._onTextChanged;
    }

    disableSearch() {
        Main.overview._controls.viewSelector.startSearch = function (event) { };
        Main.overview._controls.viewSelector._onTextChanged = function (se, prop) { };
    }

    enableSearch() {
        Main.overview._controls.viewSelector.startSearch = this.SavedstartSearch;
        Main.overview._controls.viewSelector._onTextChanged = this.SavedonTextChanged;
    }

    disable() {
        let i;

        for (i in this.workspaceInjections)
            removeInjection(Workspace.Workspace.prototype, this.workspaceInjections, i);
        for (i in this.winInjections)
            removeInjection(Workspace.WindowOverlay.prototype, this.winInjections, i);
        for (i in this.workViewInjections)
            removeInjection(WorkspacesView.WorkspacesView.prototype, this.workViewInjections, i);

        for (i of this.connectedSignals)
            i.obj.disconnect(i.id);
        for (i of this.createdActors)
            i.destroy();

        this.resetState();
    }

    resetState() {
        this.winInjections = {};
        this.workspaceInjections = {};
        this.workViewInjections = {};
        this.createdActors = [];
        this.connectedSignals = [];
        //For Window selection
        this.selectedWindows = {};
    }
}