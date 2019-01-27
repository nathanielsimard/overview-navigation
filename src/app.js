class App {

    constructor() {
        this.logger = new Logger('App');
        this.workspaceManager = new WorkspaceManager();

        const self = this;
        this.button = new Button('Multi-Monitors-Overview-Navigation', function () {
            self.logger.info('ELLLO');
            const windows = self.workspaceManager.getWindows();
            self.logger.debug(`Found ${windows.length} windows`);
            for (let window in windows) {
                self.logger.info(`Window ${window}`);
            }
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