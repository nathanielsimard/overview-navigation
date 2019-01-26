class CustomWorkspace {

    constructor(logger, windowOverlays) {
        this.logger = logger;
        this.windowOverlays = windowOverlays;
    }

    showWindowsTooltips() {
        this.logger.debug('Showing windows tooltips ...');

        for (let i in this.windowOverlays) {
            if (this.windowOverlays[i] != null)
                this.windowOverlays[i].showTooltip();
        }
    }

    hideWindowsTooltips() {
        this.logger.debug('Hiding windows tooltips ...');

        for (let i in this.windowOverlays) {
            if (this.windowOverlays[i] != null)
                this.windowOverlays[i].hideTooltip();
        }
    }
}

if (!global.overviewNavigationTesting) {
    const Workspace = imports.ui.workspace;

    function initialize(injector, logger) {
        injector.inject(CustomWorkspace, Workspace.Workspace, (parent) => {
            return new CustomWorkspace(logger, parent._windowOverlays);
        });
    }
} else {
    module.exports = { CustomWorkspace }
}
