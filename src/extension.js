const ExtensionUtils = imports.misc.extensionUtils;
const OverviewNavigation = ExtensionUtils.getCurrentExtension();

const App = OverviewNavigation.imports.app;
const Utils = OverviewNavigation.imports.utils;


let app, logger;
function init() {
    try {
        logger = new Utils.Logger('Entension');
        logger.debug("HELLO");
        app = new App.App();
        logger.debug(`App ${app}`);
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
