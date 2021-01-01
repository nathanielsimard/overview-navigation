const Clutter = require('gi/Clutter')

const { WorkspacesView } = require('ui/workspacesView')
const { WindowManager } = require('ui/windowManager')
const { Workspace } = require('ui/workspace')
const { overview } = require('ui/main')
const { Logger } = require('../utils')
const { CustomWindowManager } = require('../window/customWindowManager')
const { CustomWorkspaceView } = require('../customWorkspaceView')
const { CustomWorkspace } = require('../customWorkspace')
const { Search } = require('../search')

var initializeWindowManager = (injector, search, settings) => {
  injector.inject(CustomWindowManager, WindowManager, parent => {
    return new CustomWindowManager(search, overview, settings)
  })
}

var initializeWorkspace = (injector, settings, overlays, windowOverlayFactory) => {
  const logger = new Logger('Custom Workspace', settings)

  injector.inject(CustomWorkspace, Workspace, parent => {
    return new CustomWorkspace(logger, overlays, windowOverlayFactory, parent)
  })
}

var initializeWorkspaceView = (injector, logger, search, windowSelector, settings, overlays) => {
  logger.info('Initialize WorkspaceView')
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

var initializeSearch = (settings) => {
  return new Search(overview, new Logger('Search', settings))
}

module.exports = {
  initializeWindowManager,
  initializeWorkspaceView,
  initializeWorkspace,
  initializeSearch
}
