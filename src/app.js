class App {

    constructor() {
        this.logger = new Logger('App');
        this.overview = new Overview();

        this.button = new Button('Multi-Monitors-Overview-Navigation', () => {
            this.logger.debug('Clicked');
        });
    }

    enable() {
        this.button.enable();
        this.overview.enable();
    }

    disable() {
        this.button.disable();
        this.overview.disable();
    }
}