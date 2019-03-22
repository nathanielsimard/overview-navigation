/* eslint-disable camelcase */
class WorkspaceManager {
  constructor () {
    this.active_workspace_index = undefined
  }
  get_active_workspace_index () {
    return this.active_workspace_index
  }
}

function create () {
  return new WorkspaceManager()
}

module.exports = { create }
