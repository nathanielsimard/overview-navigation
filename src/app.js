const ExtensionUtils = imports.misc.extensionUtils;
const OverviewNavigation = ExtensionUtils.getCurrentExtension();

const Injector = OverviewNavigation.imports.injector;
const Utils = OverviewNavigation.imports.utils;
const CustomWindowManager = OverviewNavigation.imports.customWindowManager;
const WindowSelector = OverviewNavigation.imports.windowSelector;
const CustomWorkspace = OverviewNavigation.imports.customWorkspace;
const CustomWindowOverlay = OverviewNavigation.imports.customWindowOverlay;
const CustomWorkspaceView = OverviewNavigation.imports.customWorkspaceView;


class Main {

    constructor() {
        this.search = new Utils.Search()
        this.injector = new Injector.Injector(new Utils.Logger("Injector"));
        const windowSelector = new WindowSelector.WindowSelector();

        CustomWindowManager.initialize(this.injector, this.search);
        CustomWindowOverlay.initialize(this.injector, windowSelector, new Utils.Logger("CustomWindowOverlay"));
        CustomWorkspace.initialize(this.injector, new Utils.Logger("CustomWorkspace"));
        CustomWorkspaceView.initialize(this.injector, new Utils.Logger("CustomWorkspaceView"), this.search, windowSelector);
    }

    start() {
        this.injector.enable();
    }

    stop() {
        this.injector.disable();
        this.search.enable();
    }
}