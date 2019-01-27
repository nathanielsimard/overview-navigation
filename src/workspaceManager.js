
class WindowManagement {
    constructor() {
        this.logger = new Logger('WorkspaceManager');
    }

    focusWindow(workspaceIndex, windowIndex) {
        this.logger.debug('Focus Window');
        const time = global.get_current_time();
        const workspace = global.workspace_manager.get_workspace_by_index(workspaceIndex)
        const windows = workspace.list_windows();
        windows[windowIndex].activate(time);
    }

    focusWorkspace(workspace) {
        Main.wm.actionMoveWorkspace(workspace);
    }
}