const ExtensionUtils = imports.misc.extensionUtils;
const OverviewNavigation = ExtensionUtils.getCurrentExtension();

const Utils = OverviewNavigation.imports.utils;
const WindowSelector = OverviewNavigation.imports.windowSelector;
const CustomWorkspace = OverviewNavigation.imports.customWorkspace;
const CustomWindowOverlay = OverviewNavigation.imports.customWindowOverlay;
const CustomWorkspaceView = OverviewNavigation.imports.customWorkspaceView;

class App {

    constructor() {
        this.customWorkspace = new CustomWorkspace.CustomWorkspace();
        this.search = new Utils.Search()

        const windowSelector = new WindowSelector.WindowSelector();
        this.customWindowOverlay = new CustomWindowOverlay.CustomWindowOverlay(windowSelector);
        this.customWorkspaceView = new CustomWorkspaceView.CustomWorkspaceView(this.search, windowSelector);
    }

    enable() {
        this.customWorkspace.enable();
        this.customWindowOverlay.enable();
        this.customWorkspaceView.enable();
    }

    disable() {
        this.search.enable();
        this.customWorkspace.disable();
        this.customWindowOverlay.disable();
        this.customWorkspaceView.disable();
    }
}