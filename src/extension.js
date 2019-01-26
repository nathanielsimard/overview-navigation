const ExtensionUtils = imports.misc.extensionUtils;
const OverviewNavigation = ExtensionUtils.getCurrentExtension();

const app = OverviewNavigation.imports.app;
const utils = OverviewNavigation.imports.utils;


let main, logger;
function init() {
    try {
        logger = new utils.Logger('Entension');
        main = new app.Main();
        logger.info("Initialized");
    } catch (err) {
        logger.error(err);
    }
}

function enable() {
    try {
        logger.info("Enabling extension ...");
        main.start();
        logger.info("Enabled");
    } catch (err) {
        logger.error(err);
    }
}

function disable() {
    try {
        logger.info("Disabling extension ...");
        main.stop();
        logger.info("Disabled");
    } catch (err) {
        logger.error(err);
    }
}
