/* global spyOn */
class Workspace {
  showWindowsTooltips () {}
  hideWindowsTooltips () {}
  showWindowsTooltipsClosing () {}
  hideWindowsTooltipsClosing () {}
}

function create () {
  const workspace = new Workspace()
  spyOn(workspace, 'showWindowsTooltips')
  spyOn(workspace, 'hideWindowsTooltips')
  spyOn(workspace, 'showWindowsTooltipsClosing')
  spyOn(workspace, 'hideWindowsTooltipsClosing')
  return workspace
}

module.exports = { create }
