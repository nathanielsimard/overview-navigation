import Clutter from 'gi://Clutter'

import { WorkspacesView } from 'resource:///org/gnome/shell/ui/workspacesView.js'
import { WindowManager } from 'resource:///org/gnome/shell/ui/windowManager.js'
import { Workspace } from 'resource:///org/gnome/shell/ui/workspace.js'
import { overview } from 'resource:///org/gnome/shell/ui/main.js'
import { Logger } from '../utils.js'
import { CustomWindowManager } from '../window/customWindowManager.js'
import { CustomWorkspaceView } from '../customWorkspaceView.js'
import { CustomWorkspace } from '../customWorkspace.js'
import { Search } from '../search.js'

export var initializeWindowManager = (injector, search, settings) => {
  injector.inject(CustomWindowManager, WindowManager, parent => {
    return new CustomWindowManager(search, overview, settings)
  })
}

export var initializeWorkspace = (injector, settings, overlays, windowOverlayFactory) => {
  const logger = new Logger('Custom Workspace', settings)

  injector.inject(CustomWorkspace, Workspace, parent => {
    return new CustomWorkspace(logger, overlays, windowOverlayFactory, parent)
  })
}

export var initializeWorkspaceView = (injector, logger, search, windowSelector, settings, overlays) => {
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

export var initializeSearch = (settings) => {
  return new Search(overview, new Logger('Search', settings))
}
