class App {

    constructor() {
        this.customWorkspace = new CustomWorkspace();
        this.search = new Search()
        this.customWindowOverlay = new CustomWindowOverlay();
        this.customWorkspaceView = new CustomWorkspaceView(this.customWindowOverlay, this.search);
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