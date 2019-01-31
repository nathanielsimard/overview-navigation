class WindowSelector {
    constructor() {
        this.logger = new Logger('WindowSelector');
        this.selectedWindows = {};
        this.reset();
    }

    select(keySymbol, workspaces) {
        this.logger.debug(`Workspace index : ${this.workspaceIndex} Window index : ${this.windowIndex}`);

        const key = KEYS[keySymbol];
        if (key == undefined) { return false; }

        if (this.workspaceIndex == -1) {
            this.logger.debug(`Chose workspace #${key}`);
            this.workspaceIndex = key;
            return false;
        }

        if (this.windowIndex == -1) {
            if (workspaces[this.workspaceIndex].monitorIndex != 0) {
                return false;
            }
            logger.debug(`Chose window #${key}`);
            this.windowIndex = key;
            return false;
        }

        logger.debug(`Chose monitor #${key}`);
        // Only the first monitor can select the window.
        if (workspaces[this.workspaceIndex].monitorIndex != 0) {
            return false;
        }

        const tag = this._generateTag(this.workspaceIndex, this.windowIndex, key);
        const selectedWindow = this.selectedWindows[tag];
        this.logger.debug(`WWWW for tag ${tag} - ${selectedWindow}`);

        const time = global.get_current_time();
        selectedWindow.activate(time);
        return true;
    }


    addWindow(workspaceIndex, windowIndex, monitorIndex, window) {
        const tag = this._generateTag(workspaceIndex, windowIndex, monitorIndex);
        this.selectedWindows[tag] = window;
        return tag;
    }

    reset() {
        this.logger.debug('Resetting ...');
        this.workspaceIndex = -1;
        this.windowIndex = -1;
    }

    _generateTag(workspaceIndex, windowIndex, monitorIndex) {
        return `[${workspaceIndex}-${windowIndex}-${monitorIndex}]`;
    }
}