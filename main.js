const St = imports.gi.St;
const Main = imports.ui.main;
const AltTab = imports.ui.altTab;
const WorkspaceThumbnail = imports.ui.workspaceThumbnail;

let app, logger;
function init() {
    try {
        logger = new Logger('Main');
        app = new App();
        logger.info("Initialized");
    } catch (err) {
        logger.error(err);
    }
}

function enable() {
    try {
        logger.info("Enabling extension ...");
        app.enable();
        logger.info("Enabled");
    } catch (err) {
        logger.error(err);
    }
}

function disable() {
    try {
        logger.info("Disabling extension ...");
        app.disable();
        logger.info("Disabled");
    } catch (err) {
        logger.error(err);
    }
}
