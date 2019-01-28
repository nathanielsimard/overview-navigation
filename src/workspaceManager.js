
class WindowManagement {
    constructor() {
        this.logger = new Logger('WorkspaceManager');
        this.windowManager = global.workspace_manager;
    }

    focusWindow(workspaceIndex, windowIndex) {
        this.logger.debug(`Focus Window ${workspaceIndex}-${windowIndex}`);
        const time = global.get_current_time();
        const workspace = this.windowManager.get_workspace_by_index(workspaceIndex)
        const windows = workspace.list_windows();
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