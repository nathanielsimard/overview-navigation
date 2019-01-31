class App {

    constructor() {
        this.customWorkspace = new CustomWorkspace();
        this.search = new Search()
        const windowSelector = new WindowSelector();

        this.customWindowOverlay = new CustomWindowOverlay(windowSelector);
        this.customWorkspaceView = new CustomWorkspaceView(this.search, windowSelector);
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