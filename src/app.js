class App {

    constructor() {
        this.logger = new Logger('App');
        this.wm = new WindowManagement();

        this.button = new Button('Multi-Monitors-Overview-Navigation', () => {
            this.logger.debug('Clicked');
            this.wm.focusWindow(0, 0);
        });

        let monitors = Main.layoutManager.monitors;
        this.logger.debug(`Number of monitors ${monitors.length}`);
        for (let monitor in monitors) {
            this.logger.debug(monitor);
        }
        this.logger.info("Initialized");
    }

    enable() {
        this.logger.info("Enabling extension ...");
        this.button.enable();
        this.logger.info("Enabled");
    }

    disable() {
        this.logger.info("Disabling extension ...");
        this.button.disable();
        this.logger.info("Disabled");
    }
}