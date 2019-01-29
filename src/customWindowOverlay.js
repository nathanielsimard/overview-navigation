class CustomWindowOverlay {
    constructor() {
        this.logger = new Logger('CustomWindowOverlay');
    }

    enable() {
        this.selectedWindows = {};
        this.labels = [];

        this._init(this.labels, this.logger);
        this._reLayout(this.logger);
        this._showTooltip(this.selectedWindows, this.logger);
        this._hideTooltip(this.logger);
    }

    disable() {
        delete Workspace.WindowOverlay.prototype.showTooltip;
        delete Workspace.WindowOverlay.prototype.hideTooltip;

        for (let i = 0; i < this.labels.length; i++) {
            this.labels[i].destroy();
        }

        Workspace.WindowOverlay.prototype._init = this.originalInit;
        Workspace.WindowOverlay.prototype.relayout = this.originalRelayout;
    }

    _init(labels, logger) {
        this.originalInit = injectToFunction(Workspace.WindowOverlay.prototype, '_init', function (windowClone, parentActor) {
            logger.info('Initializing ...');

            this.label = new St.Label({ style_class: 'extension-windowsNavigator-window-tooltip' });
            this.label.hide();

            labels.push(this.label);
            parentActor.add_actor(this.label);
        });
    }

    _reLayout(logger) {
        this.originalRelayout = injectToFunction(Workspace.WindowOverlay.prototype, 'relayout', function (animate) {
            logger.info('Relayout ...');

            let [cloneX, cloneY, cloneWidth, cloneHeight] = this._windowClone.slot;
            let textX = cloneX - 2;
            let textY = cloneY - 2;

            this.label.set_position(Math.floor(textX) + 5, Math.floor(textY) + 5);
            this.label.raise_top();
        });
    }

    _showTooltip(selectedWindows, logger) {
        Workspace.WindowOverlay.prototype.showTooltip = function () {
            logger.info('Showing tooltip ...');

            const windowIndex = this._windowClone.slotId;
            const workspace = this._windowClone._workspace;
            const monitorIndex = workspace.monitorIndex;
            const workspaceIndex = workspace.metaWorkspace.index();
            const tag = `${workspaceIndex}${windowIndex}${monitorIndex}`;

            this.label.text = tag;
            this.label.raise_top();
            this.label.show();
            selectedWindows[tag] = this._windowClone.metaWindow;
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