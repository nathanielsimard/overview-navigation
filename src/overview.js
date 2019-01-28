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


let winInjections, workspaceInjections, workViewInjections, createdActors, connectedSignals;
class Overview {
    constructor(wm) {
        this.wm = wm;
        this.resetState();
        this.logger = new Logger('Overview');
        const logger = this.logger;

        Workspace.WindowOverlay.prototype.showTooltip = function () {
            this._text.raise_top();
            this._text.show();
            const windowIndex = this._windowClone.slotId;
            const workspace = this._windowClone._workspace;
            const monitorIndex = workspace.monitorIndex;
            const workspaceIndex = workspace.metaWorkspace.index();
            this._text.text = `${workspaceIndex}${windowIndex}${monitorIndex}`;
        }
        winInjections['showTooltip'] = undefined;

        Workspace.WindowOverlay.prototype.hideTooltip = function () {
            if (this._text && this._text.visible)
                this._text.hide();
        }
        winInjections['hideTooltip'] = undefined;

        Workspace.Workspace.prototype.showTooltip = function () {
            if (this._tip == null || this._actualGeometry == null)
                return;
            this._tip.text = (this.metaWorkspace.index() + 1).toString();

            // Hand code this instead of using _getSpacingAndPadding
            // because that fails on empty workspaces
            let node = this.actor.get_theme_node();
            let padding = {
                left: node.get_padding(St.Side.LEFT),
                top: node.get_padding(St.Side.TOP),
                bottom: node.get_padding(St.Side.BOTTOM),
                right: node.get_padding(St.Side.RIGHT),
            };

            let area = Workspace.padArea(this._actualGeometry, padding);
            this._tip.x = area.x;
            this._tip.y = area.y;
            this._tip.show();
            this._tip.raise_top();
        }
        workspaceInjections['showTooltip'] = undefined;

        Workspace.Workspace.prototype.hideTooltip = function () {
            if (this._tip == null)
                return;
            if (!this._tip.get_parent())
                return;
            this._tip.hide();
        }
        workspaceInjections['hideTooltip'] = undefined;

        Workspace.Workspace.prototype.getWindowWithTooltip = function (id) {
            for (let i = 0; i < this._windows.length; i++) {
                if ((this._windows[i].slotId + 1) == id)
                    return this._windows[i].metaWindow;
            }
            return null;
        }
        workspaceInjections['getWindowWithTooltip'] = undefined;

        Workspace.Workspace.prototype.showWindowsTooltips = function () {
            for (let i in this._windowOverlays) {
                if (this._windowOverlays[i] != null)
                    this._windowOverlays[i].showTooltip();
            }
        }
        workspaceInjections['showWindowsTooltips'] = undefined;

        Workspace.Workspace.prototype.hideWindowsTooltips = function () {
            for (let i in this._windowOverlays) {
                if (this._windowOverlays[i] != null)
                    this._windowOverlays[i].hideTooltip();
            }
        }
        workspaceInjections['hideWindowsTooltips'] = undefined;

        WorkspacesView.WorkspacesView.prototype._hideTooltips = function () {
            if (global.stage.get_key_focus() == global.stage)
                global.stage.set_key_focus(this._prevFocusActor);
            this._pickWindow = false;
            for (let i = 0; i < this._workspaces.length; i++)
                this._workspaces[i].hideWindowsTooltips();
        }
        workViewInjections['_hideTooltips'] = undefined;

        WorkspacesView.WorkspacesView.prototype._hideWorkspacesTooltips = function () {
            global.stage.set_key_focus(this._prevFocusActor);
            this._pickWorkspace = false;
            for (let i = 0; i < this._workspaces.length; i++)
                this._workspaces[i].hideTooltip();
        }
        workViewInjections['_hideWorkspacesTooltips'] = undefined;

        WorkspacesView.WorkspacesView.prototype._onKeyRelease = function (s, o) {
            logger.debug('On key release');
            this._prevFocusActor = global.stage.get_key_focus();
            if (this._pickWindow &&
                (o.get_key_symbol() == Clutter.KEY_Alt_L ||
                    o.get_key_symbol() == Clutter.KEY_Alt_R))
                this._hideTooltips();
            if (this._pickWorkspace &&
                (o.get_key_symbol() == Clutter.KEY_Control_L ||
                    o.get_key_symbol() == Clutter.KEY_Control_R))
                this._hideWorkspacesTooltips();
        }
        workViewInjections['_onKeyRelease'] = undefined;

        let workspaceIndex = -1;
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

        Main.overview._searchEntryBin.hide();
        Main.overview._controls.viewSelector.startSearch = function (event) { };
        Main.overview._controls.viewSelector._onTextChanged = function (se, prop) { };

        WorkspacesView.WorkspacesView.prototype._onKeyPress = function (s, o) {
            logger.debug('On key press');
            if (Main.overview.viewSelector._activePage != Main.overview.viewSelector._workspacesPage)
                return false;

            let key = binding[o.get_key_symbol()];
            logger.debug(`Pressed key ${key}`);
            if (key != undefined) {
                logger.debug(workspaceIndex);
                if (workspaceIndex == -1) {
                    logger.debug('Choosed workspace');
                    workspaceIndex = key;
                } else {
                    logger.debug('Choosed window');
                    wm.focusWindow(workspaceIndex, key);
                    workspaceIndex = -1;
                    Main.overview.hide();
                    return true;
                }
            }

            if ((o.get_key_symbol() == Clutter.KEY_Alt_L || o.get_key_symbol() == Clutter.KEY_Alt_R)) {
                this._pickWindow = true;
                for (let i = 0; i < this._workspaces.length; i++) {
                    this._workspaces[i].showWindowsTooltips();
                }
            }
            return false;
        }
        workViewInjections['_onKeyPress'] = undefined;

        winInjections['_init'] = injectToFunction(Workspace.WindowOverlay.prototype, '_init', function (windowClone, parentActor) {
            this._id = null;
            createdActors.push(this._text = new St.Label({ style_class: 'extension-windowsNavigator-window-tooltip' }));
            this._text.hide();
            parentActor.add_actor(this._text);
        });

        winInjections['relayout'] = injectToFunction(Workspace.WindowOverlay.prototype, 'relayout', function (animate) {
            let [cloneX, cloneY, cloneWidth, cloneHeight] = this._windowClone.slot;

            let textX = cloneX - 2;
            let textY = cloneY - 2;
            this._text.set_position(Math.floor(textX) + 5, Math.floor(textY) + 5);
            this._text.raise_top();
        });

        workspaceInjections['_init'] = injectToFunction(Workspace.Workspace.prototype, '_init', function (metaWorkspace) {
            if (metaWorkspace && metaWorkspace.index() < 9) {
                createdActors.push(this._tip = new St.Label({
                    style_class: 'extension-windowsNavigator-window-tooltip',
                    visible: false
                }));

                this.actor.add_actor(this._tip);
                let signalId = this.actor.connect('notify::scale-x', () => {
                    this._tip.set_scale(1 / this.actor.scale_x, 1 / this.actor.scale_x);
                });
                connectedSignals.push({ obj: this.actor, id: signalId });
            } else
                this._tip = null;
        });

        workViewInjections['_init'] = injectToFunction(WorkspacesView.WorkspacesView.prototype, '_init', function (width, height, x, y, workspaces) {
            this._pickWorkspace = false;
            this._pickWindow = false;
            this._keyPressEventId =
                global.stage.connect('key-press-event', this._onKeyPress.bind(this));
            this._keyReleaseEventId =
                global.stage.connect('key-release-event', this._onKeyRelease.bind(this));
            connectedSignals.push({ obj: global.stage, id: this._keyPressEventId });
            connectedSignals.push({ obj: global.stage, id: this._keyReleaseEventId });
        });

        workViewInjections['_onDestroy'] = injectToFunction(WorkspacesView.WorkspacesView.prototype, '_onDestroy', function () {
            global.stage.disconnect(this._keyPressEventId);
            global.stage.disconnect(this._keyReleaseEventId);
            connectedSignals = [];
        });

        this.logger = new Logger('Overview');
    }

    disable() {
        let i;

        for (i in workspaceInjections)
            removeInjection(Workspace.Workspace.prototype, workspaceInjections, i);
        for (i in winInjections)
            removeInjection(Workspace.WindowOverlay.prototype, winInjections, i);
        for (i in workViewInjections)
            removeInjection(WorkspacesView.WorkspacesView.prototype, workViewInjections, i);
        for (i of connectedSignals)
            i.obj.disconnect(i.id);
        for (i of createdActors)
            i.destroy();

        this.resetState();
        Main.overview._searchEntryBin.show();
        Main.overview._controls.viewSelector.startSearch = this.SavedstartSearch;
        Main.overview._controls.viewSelector._onTextChanged = this.SavedonTextChanged;
    }
    resetState() {
        winInjections = {};
        workspaceInjections = {};
        workViewInjections = {};
        createdActors = [];
        connectedSignals = [];
    }



}