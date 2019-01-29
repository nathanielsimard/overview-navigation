function removeInjection(object, injection, name) {
    if (injection[name] === undefined)
        delete object[name];
    else
        object[name] = injection[name];
}

function injectToFunction(parent, name, func) {
    let origin = parent[name];
    parent[name] = function () {
        let ret;
        ret = origin.apply(this, arguments);
        if (ret === undefined)
            ret = func.apply(this, arguments);
        return ret;
    }
    return origin;
}


class Overview {
    constructor() {
        this.customWindowOverlay = new CustomWindowOverlay();
        this.customWorkspaceView = new CustomWorkspaceView(this.customWindowOverlay);

        this.resetState();
        this.logger = new Logger('Overview');
    }

    enable() {
        this.customWindowOverlay.enable();
        this.customWorkspaceView.enable();

        const self = this;
        Workspace.Workspace.prototype.showWindowsTooltips = function () {
            for (let i in this._windowOverlays) {
                if (this._windowOverlays[i] != null)
                    this._windowOverlays[i].showTooltip();
            }
        }
        this.workspaceInjections['showWindowsTooltips'] = undefined;

        Workspace.Workspace.prototype.hideWindowsTooltips = function () {
            for (let i in this._windowOverlays) {
                if (this._windowOverlays[i] != null)
                    this._windowOverlays[i].hideTooltip();
            }
        }
    }

    disable() {
        this.customWindowOverlay.disable();
        this.customWorkspaceView.disable();

        let i;

        for (i in this.workspaceInjections)
            removeInjection(Workspace.Workspace.prototype, this.workspaceInjections, i);

        this.resetState();
    }

    resetState() {
        this.workspaceInjections = {};
    }
}