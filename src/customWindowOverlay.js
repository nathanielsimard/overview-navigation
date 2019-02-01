class CustomWindowOverlay {
    constructor(windowSelector) {
        this.logger = new Logger('CustomWindowOverlay');
        this.windowSelector = windowSelector
    }

    enable() {
        this.labels = [];

        this._init(this.labels, this.logger);
        this._reLayout(this.logger);
        this._showTooltip(this.windowSelector, this.logger);
        this._hideTooltip(this.logger);
    }

    disable() {
        delete Workspace.WindowOverlay.prototype.showTooltip;
        delete Workspace.WindowOverlay.prototype.hideTooltip;

        for (let i = 0; i < this.labels.length; i++) {
            this.labels[i].destroy();
        }

        this.overrideInit.disable();
        this.overrideRelayout.disable();
    }

    _init(labels, logger) {
        this.overrideInit = new Override(Workspace.WindowOverlay.prototype, '_init', function (windowClone, parentActor) {
            logger.info('Initializing ...');

            this.label = new St.Label({ style_class: 'extension-windowsNavigator-window-tooltip' });
            this.label.hide();

            labels.push(this.label);
            parentActor.add_actor(this.label);
        });
        this.overrideInit.enable();
    }

    _reLayout(logger) {
        this.overrideRelayout = new Override(Workspace.WindowOverlay.prototype, 'relayout', function (animate) {
            logger.info('Relayout ...');

            let [cloneX, cloneY, cloneWidth, cloneHeight] = this._windowClone.slot;
            let textX = cloneX - 2;
            let textY = cloneY - 2;

            this.label.set_position(Math.floor(textX) + 5, Math.floor(textY) + 5);
            this.label.raise_top();
        });
        this.overrideRelayout.enable();
    }

    _showTooltip(windowSelector, logger) {
        Workspace.WindowOverlay.prototype.showTooltip = function () {
            logger.info('Showing tooltip ...');
            const name = windowSelector.addWindow(this._windowClone.metaWindow);

            this.label.text = name;
            this.label.raise_top();
            this.label.show();
        }
    }

    _hideTooltip(logger) {
        Workspace.WindowOverlay.prototype.hideTooltip = function () {
            logger.info('Hiding tooltip ...');

            if (this.label && this.label.visible) {
                this.label.hide();
            }
        }
    }
}