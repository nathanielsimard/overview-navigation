const St = require('gi/St')
const Clutter = require('gi/Clutter')
const WorkspacesView = require('ui/workspacesView')
const Workspace = require('ui/workspace')
const { WindowManager } = require('ui/windowManager')
const Main = require('ui/main')
const Utils = require('../utils')
const { CustomWindowManager } = require('../window/customWindowManager')
const { CustomWindowOverlay } = require('../window/customWindowOverlay')
const { CustomWorkspaceView } = require('../customWorkspaceView')
const { Search } = require('../search')

const initializeWindowManager = (injector, search, settings) => {
  injector.inject(CustomWindowManager, WindowManager, parent => {
    return new CustomWindowManager(search, Main.overview, settings)
  })
}

const initializeWindowOverlay = (injector, windowSelector, logger, overlays) => {
  injector.inject(CustomWindowOverlay, Workspace.WindowOverlay, parent => {
    const customWindow = new CustomWindowOverlay(
      logger,
      windowSelector,
      new St.Label({}),
      parent._parentActor,
      parent._windowClone,
      parent._windowClone.metaWindow,
      3,
      overlays
    )
    overlays.addWindow(customWindow)
    return customWindow
  })
}

function initializeWorkspaceView (injector, logger, search, windowSelector, settings, overlays) {
  injector.inject(CustomWorkspaceView, WorkspacesView.WorkspacesView, parent => {
    var workspaceManager = global.workspace_manager
    if (!workspaceManager) {
      workspaceManager = global.screen
    }

    return new CustomWorkspaceView(
      logger,
      search,
      windowSelector,
      global.stage,
      parent._workspaces,
      workspaceManager,
      Clutter,
      settings,
      overlays
    )
  })
}

function initializeSearch () {
  return new Search(Main.overview, new Utils.Logger('Search'))
}

module.exports = {
  initializeWindowManager,
  initializeWindowOverlay,
  initializeWorkspaceView,
  initializeSearch
}
