const ExtensionUtils = imports.misc.extensionUtils;
const OverviewNavigation = ExtensionUtils.getCurrentExtension();

const Utils = OverviewNavigation.imports.utils;

const WorkspacesView = imports.ui.workspacesView;
const Main = imports.ui.main;
const Clutter = imports.gi.Clutter;


class CustomWorkspaceView {
    constructor(search, windowSelector) {
        this.logger = new Utils.Logger('CustomWorkspaceView');
        this.search = search;
        this.windowSelector = windowSelector;
    }

    enable() {
        this._init(this.logger, this.search);
        this._onDestroy(this.logger);
        this._onKeyPress(this.windowSelector, this.logger);
        this._onKeyRelease(this.logger);
        this._hideTooltips(this.windowSelector, this.logger);
    }

    disable() {
        delete WorkspacesView.WorkspacesView.prototype.onKeyPress;
        delete WorkspacesView.WorkspacesView.prototype.onKeyRelease;
        delete WorkspacesView.WorkspacesView.prototype.hideTooltips;

        this.overrideInit.disable();
        this.overrideOnDestroy.disable();
    }

    _init(logger, search) {
        this.overrideInit = new Utils.Override(WorkspacesView.WorkspacesView.prototype, '_init', function (width, height, x, y, workspaces) {
            logger.info('Initializing ...');
            this.workspaceManager = global.workspace_manager;

            if (!this.workspaceManager) { this.workspaceManager = global.screen }
            if (!this.display) { this.display = global.screen }

            this.search = search;
            this.keyPressEventId = global.stage.connect('key-press-event', this.onKeyPress.bind(this));
            this.keyReleaseEventId = global.stage.connect('key-release-event', this.onKeyRelease.bind(this));
        });
        this.overrideInit.enable();
    }

    _onDestroy(logger) {
        this.overrideOnDestroy = new Utils.Override(WorkspacesView.WorkspacesView.prototype, '_onDestroy', function () {
            logger.info('Destroying ...');

            global.stage.disconnect(this.keyPressEventId);
            global.stage.disconnect(this.keyReleaseEventId);
        });
        this.overrideOnDestroy.enable();
    }

    _onKeyPress(windowSelector, logger) {
        WorkspacesView.WorkspacesView.prototype.onKeyPress = function (s, o) {
            logger.info('On key press ...');

            if (Main.overview.viewSelector._activePage != Main.overview.viewSelector._workspacesPage)
                return false;

            if ((o.get_key_symbol() == Clutter.KEY_Alt_L || o.get_key_symbol() == Clutter.KEY_Alt_R)) {
                this.search.disable();
                for (let i = 0; i < this._workspaces.length; i++) {
                    this._workspaces[i].showWindowsTooltips();
                }
            }

            let activeWorkspaceIndex = this.workspaceManager.get_active_workspace_index();
            let activeMonitorIndex = 0
            logger.debug(`Active Workspace Index ${activeMonitorIndex} Active Monitor Index ${activeMonitorIndex}`);

            if (this._workspaces[activeWorkspaceIndex].monitorIndex != activeMonitorIndex) { return false }

            if (windowSelector.select(o.get_key_symbol())) {
                this.hideTooltips();
                windowSelector.reset();
                Main.overview.hide();
                return true;
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

    _hideTooltips(windowSelector, logger) {
        WorkspacesView.WorkspacesView.prototype.hideTooltips = function () {
            logger.info('Hiding tooltips ...');

            if (global.stage.get_key_focus() == global.stage)
                global.stage.set_key_focus(this._prevFocusActor);

            windowSelector.reset();
            this.search.enable();
            for (let i = 0; i < this._workspaces.length; i++)
                this._workspaces[i].hideWindowsTooltips();
        }

    }
}