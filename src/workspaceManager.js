
class WindowManagement {
    constructor() {
        this.logger = new Logger('WorkspaceManager');
        this.windowManager = global.workspace_manager;
        if (this.windowManager == undefined) {
            this.windowManager = global.screen;
        }
    }

    focusWindow(workspaceIndex, windowIndex, monitorIndex) {
        this.logger.debug(`Focus Window ${workspaceIndex}-${windowIndex}-${monitorIndex}`);
        const time = global.get_current_time();
        const workspace = this.windowManager.get_workspace_by_index(workspaceIndex)
        this.logger.debug(`Monitor index ${workspace.monitorIndex}`);
        const windows = workspace.list_windows();
        this.logger.debug(`Windows lenght ${windows.length}`);
        const windowMap = {};
        for (let i = 0; i < windows.length; i++) {
            this.logger.debug(`monitorIndex w ${windows[i].monitorIndex}`);
        }
        windows[windows.length - windowIndex - 1].activate(time);
    }

    focusWorkspace(workspace) {
        Main.wm.actionMoveWorkspace(workspace);
    }

    getWorkspaceId(workspace) {
        for (let w = 0; w < this.windowManager.n_workspaces; w++) {
            let currentWorkspace = this.windowManager.get_workspace_by_index(w);
            if (workspace == currentWorkspace) {
                return w;
            }
        }
        return 0;
    }
}