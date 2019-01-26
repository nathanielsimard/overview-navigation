class CustomWorkspaceView {

    constructor(logger, search, windowSelector, stage, workspaces, workspaceManager, keys, overview, keySymbols, ignoredKeySymbols) {
        this.logger = logger;
        this.search = search;
        this.windowSelector = windowSelector;
        this.stage = stage;
        this.workspaces = workspaces;
        this.workspaceManager = workspaceManager;
        this.keys = keys;
        this.overview = overview;
        this.keySymbols = keySymbols;
        this.ignoredKeySymbols = ignoredKeySymbols;
    }

    _init() {
        this.logger.debug('Initializing ...');
        this.search.disable();
        this.keyPressEventId = this.stage.connect('key-press-event', this.onKeyPress.bind(this));
        this.keyReleaseEventId = this.stage.connect('key-release-event', this.onKeyRelease.bind(this));
    }

    _onDestroy() {
        this.search.enable();
        this.windowSelector.reset();
        this.stage.disconnect(this.keyPressEventId);
        this.stage.disconnect(this.keyReleaseEventId);
    }

    onKeyPress(s, o) {
        this.logger.debug('On key press ...');
        if (!this.isOnFirstMonitor()) { return }

        if (this.isShowTooltipsKeySymbol(o.get_key_symbol())) {
            this.showTooltips();
        }
        if (this.windowSelector.select(o.get_key_symbol())) {
            this.closeOverview();
        }
    }

    onKeyRelease(s, o) {
        this.logger.debug('On key release ...');

        const keySymbol = o.get_key_symbol();

        if (this.keySymbols[keySymbol] == undefined && this.ignoredKeySymbols[keySymbol] == undefined) {
            this.hideTooltips();
        }
    }

    closeOverview() {
        this.windowSelector.reset();
        this.overview.hide();
    }

    isShowTooltipsKeySymbol(keySymbol) {
        return keySymbol == this.keys.KEY_Alt_L || keySymbol == this.keys.KEY_Alt_R;
    }

    isOnFirstMonitor() {
        const activeWorkspaceIndex = this.workspaceManager.get_active_workspace_index();
        return this.workspaces[activeWorkspaceIndex].monitorIndex == 0;
    }

    showTooltips() {
        this.logger.debug('Showing tooltips ...');

        this.search.disable();
        for (let i = 0; i < this.workspaces.length; i++) {
            this.workspaces[i].showWindowsTooltips();
        }
    }

    hideTooltips() {
        this.logger.debug('Hiding tooltips ...');

        this.windowSelector.resetSelection();
        this.search.enable();
        for (let i = 0; i < this.workspaces.length; i++) {
            this.workspaces[i].hideWindowsTooltips();
        }
    }
}

if (!global.overviewNavigationTesting) {
    const ExtensionUtils = imports.misc.extensionUtils;
    const OverviewNavigation = ExtensionUtils.getCurrentExtension();
    const Utils = OverviewNavigation.imports.utils;

    const Clutter = imports.gi.Clutter;
    const WorkspacesView = imports.ui.workspacesView;
    const Main = imports.ui.main;

    function initialize(injector, logger, search, windowSelector) {
        injector.inject(CustomWorkspaceView, WorkspacesView.WorkspacesView, (parent) => {
            var workspaceManager = global.workspace_manager;
            if (!workspaceManager) { workspaceManager = global.screen }

            return new CustomWorkspaceView(logger,
                search,
                windowSelector,
                global.stage,
                parent._workspaces,
                workspaceManager,
                Clutter,
                Main.overview,
                Utils.KEYS,
                Utils.IGNORE_KEYS);
        });
    }
} else {
    module.exports = { CustomWorkspaceView }
}
