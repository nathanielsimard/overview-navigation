class App {

    constructor() {
        this.logger = new Logger('App');
        this.wm = new WindowManagement();
        this.overview = new Overview(this.wm);

        this.button = new Button('Multi-Monitors-Overview-Navigation', () => {
            this.logger.debug('Clicked');
            this.wm.focusWindow(0, 0);
        });
    }

    enable() {
        this.button.enable();
    }

    disable() {
        this.button.disable();
        this.overview.disable();
    }
}