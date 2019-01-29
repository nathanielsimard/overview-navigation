class App {

    constructor() {
        this.logger = new Logger('App');
        this.customWorkspace = new CustomWorkspace();
        this.customWindowOverlay = new CustomWindowOverlay();
        this.customWorkspaceView = new CustomWorkspaceView(this.customWindowOverlay);

        this.button = new Button('Multi-Monitors-Overview-Navigation', () => {
            this.logger.debug('Clicked');
        });
    }

    enable() {
        this.button.enable();
        this.customWorkspace.enable();
        this.customWindowOverlay.enable();
        this.customWorkspaceView.enable();
    }

    disable() {
        this.button.disable();
        this.customWorkspace.disable();
        this.customWindowOverlay.disable();
        this.customWorkspaceView.disable();
    }
}