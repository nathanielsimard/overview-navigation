const Clutter = require('gi/Clutter')

const { Label } = require('../components')
const { WorkspacesView } = require('ui/workspacesView')
const { WindowPreview } = require('ui/workspace')
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

var initializeWindowOverlay = (injector, windowSelector, logger, overlays, settings) => {
  logger.info('Initialize overlays')
  injector.inject(CustomWindowOverlay, WindowPreview, parent => {
    const customWindow = new CustomWindowOverlay(
      logger,
      windowSelector,
      new Label(settings, parent._windowActor),
      parent,
      parent.metaWindow,
      3,
      overlays,
      settings
    )
    logger.info(`CustomWindowOverlay createddd`)
    overlays.addWindow(customWindow)
    return customWindow
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
  initializeWindowOverlay,
  initializeWorkspaceView,
  initializeSearch
}
