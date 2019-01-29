class CustomWorkspace {
    constructor() {
        this.logger = new Logger('CustomWorkspace');
    }

    enable() {
        this._showWindowsTooltips(this.logger);
        this._hideWindowsTooltips(this.logger);
    }

    disable() {
        delete Workspace.Workspace.prototype.hideWindowsTooltips;
        delete Workspace.Workspace.prototype.showWindowsTooltips;
    }

    _showWindowsTooltips(logger) {
        Workspace.Workspace.prototype.showWindowsTooltips = function () {
            logger.info('Showing windows tooltips ...');

            for (let i in this._windowOverlays) {
                if (this._windowOverlays[i] != null)
                    this._windowOverlays[i].showTooltip();
            }
        }
    }

    _hideWindowsTooltips(logger) {
        Workspace.Workspace.prototype.hideWindowsTooltips = function () {
            logger.info('Hiding windows tooltips ...');

            for (let i in this._windowOverlays) {
                if (this._windowOverlays[i] != null)
                    this._windowOverlays[i].hideTooltip();
            }
        }
    }
}