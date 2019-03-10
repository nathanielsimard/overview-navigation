/* global spyOn */
class Workspace {
  showWindowsTooltips () {}
  hideWindowsTooltips () {}
}

function create () {
  const workspace = new Workspace()
  spyOn(workspace, 'showWindowsTooltips')
  spyOn(workspace, 'hideWindowsTooltips')
  return workspace
}

module.exports = { create }
