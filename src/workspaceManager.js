
class WorkspaceManager {
    constructor() {
        this.logger = new Logger('WorkspaceManager');
        this._workspaceManager = global.workspace_manager;
    }

    getWindows() {
        this.logger.debug('get windows');
        const workspaces = this.getWorkplaces();
        const windows = []
        for (let i = 0; i < workspaces.length; i++) {
            this.logger.debug(`Get windows for workspace ${i}`);
            const workspaceWindows = AltTab.getWindows(workspaces[i]);
            this.logger.debug(`Found ${workspaceWindows.length} windows`);
            for (let w in workspaceWindows) {
                windows.push(w);
            }
        }
        return windows;
    }

    getWorkplaces() {
        this.logger.debug('get workspaces');
        const workspaces = [];
        for (let w = 0; w < this._workspaceManager.n_workspaces; w++) {
            workspaces.push(this._workspaceManager.get_workspace_by_index(w));
        }
        return workspaces;
    }

}