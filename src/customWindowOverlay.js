class CustomWindowOverlay {

    constructor(logger, windowSelector, label, parentActor, windowClone, metaWindow, padding) {
        this.logger = logger;
        this.logger.debug('Initializing ...');
        this.windowSelector = windowSelector;
        this.windowClone = windowClone;
        this.label = label;
        this.padding = padding;

        parentActor.add_actor(label);
        windowSelector.registerWindow(metaWindow, function (name) {
            label.text = name;
        });
    }

    relayout(animate) {
        let [x, y, _weight, _height] = this.windowClone.slot;
        this.logger.debug('Calculating layout ...');
        this.label.set_position(Math.floor(x) + this.padding, Math.floor(y) + this.padding);
    }

    _onDestroy() {
        this.logger.debug('Destroying ...');
        this.label.destroy();
    }

    showTooltip() {
        this.logger.debug('Showing tooltip ...');
        this.label.raise_top();
        this.label.show();
    }

    hideTooltip() {
        this.logger.debug('Hiding tooltip ...');
        this.label.hide();
    }
}

if (!global.overviewNavigationTesting) {
    const St = imports.gi.St;
    const Workspace = imports.ui.workspace;

    function initialize(injector, windowSelector, logger) {
        injector.inject(CustomWindowOverlay, Workspace.WindowOverlay, (parent) => {
            const label = new St.Label({ style_class: 'extension-overview-navigation-window-tooltip' });
            return new CustomWindowOverlay(logger,
                windowSelector,
                label,
                parent._parentActor,
                parent._windowClone,
                parent._windowClone.metaWindow,
                3);
        });
    }
} else {
    module.exports = { CustomWindowOverlay }
}
