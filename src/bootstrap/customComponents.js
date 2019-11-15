const Clutter = require('gi/Clutter')

const { Label } = require('gi/St')
const { WorkspacesView } = require('ui/workspacesView')
const { WindowOverlay } = require('ui/workspace')
const { WindowManager } = require('ui/windowManager')
const { overview } = require('ui/main')
const { Logger } = require('../utils')
const { CustomWindowManager } = require('../window/customWindowManager')
const { CustomWindowOverlay } = require('../window/customWindowOverlay')
const { CustomWorkspaceView } = require('../customWorkspaceView')
const { Search } = require('../search')

var initializeWindowManager = (injector, search, settings) => {
  injector.inject(CustomWindowManager, WindowManager, parent => {
    return new CustomWindowManager(search, overview, settings)
  })
}

var initializeWindowOverlay = (injector, windowSelector, logger, overlays) => {
  injector.inject(CustomWindowOverlay, WindowOverlay, parent => {
    const customWindow = new CustomWindowOverlay(
      logger,
      windowSelector,
      new Label({}),
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

var initializeWorkspaceView = (injector, logger, search, windowSelector, settings, overlays) => {
  injector.inject(CustomWorkspaceView, WorkspacesView, parent => {
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

var initializeSearch = () => {
  return new Search(overview, new Logger('Search'))
}

module.exports = {
  initializeWindowManager,
  initializeWindowOverlay,
  initializeWorkspaceView,
  initializeSearch
}
