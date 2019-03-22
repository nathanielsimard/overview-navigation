/* global describe */
/* global beforeEach */
/* global it */
/* global expect */
require('./helpers/core')

const searchMock = require('./helpers/searchMock')
const stageMock = require('./helpers/stageMock')
const overviewMock = require('./helpers/overviewMock')
const windowSelectorMock = require('./helpers/windowSelectorMock')
const settingsStub = require('./helpers/settingsStub.js')
const workspaceManagerStub = require('./helpers/workspaceManagerStub.js')
const workspaceMock = require('./helpers/workspaceMock.js')

const log = require('../src/utils')
const cwv = require('../src/customWorkspaceView')

describe('Custom Workspace View', function () {
  let logger
  let search
  let windowSelector
  let stage
  let workspaces
  let workspaceManager
  let keys
  let overview
  let keySymbols
  let ignoredKeySymbols
  let settings
  let customWorkspaceView

  beforeEach(function () {
    logger = new log.TestLogger('CustomWorkspaceViewTest', false)
    search = searchMock.create()
    windowSelector = windowSelectorMock.create()
    stage = stageMock.create()
    overview = overviewMock.create()
    workspaces = [workspaceMock.create()]
    workspaceManager = workspaceManagerStub.create()
    keys = {}
    keySymbols = {}
    ignoredKeySymbols = {}
    settings = settingsStub.create()

    customWorkspaceView = new cwv.CustomWorkspaceView(
      logger,
      search,
      windowSelector,
      stage,
      workspaces,
      workspaceManager,
      keys,
      overview,
      keySymbols,
      ignoredKeySymbols,
      settings
    )
  })

  describe("with settings 'Show Window Selector When Show Overview'=true", () => {
    beforeEach(() => (settings.showWindowSelectorWhenShowOverview = true))

    describe('when initializing', () => {
      beforeEach(() => customWorkspaceView._init())

      it('disables search', () => {
        expect(search.disable).toHaveBeenCalled()
      })

      it('shows tooltips', () => {
        workspaces.forEach(workspace => {
          expect(workspace.showWindowsTooltips).toHaveBeenCalled()
        })
      })
    })
  })

  describe("with settings 'Show Window Selector When Show Overview'=false", () => {
    beforeEach(() => (settings.showWindowSelectorWhenShowOverview = false))

    describe('when initializing', () => {
      beforeEach(() => customWorkspaceView._init())

      it('enables search', function () {
        expect(search.enable).toHaveBeenCalled()
      })

      it('hides tooltips', () => {
        workspaces.forEach(workspace => {
          expect(workspace.hideWindowsTooltips).toHaveBeenCalled()
        })
      })
    })
  })

  describe('when initializing', () => {
    beforeEach(() => customWorkspaceView._init())

    it('binds stage key event', function () {
      expect(stage.connect).toHaveBeenCalledTimes(2)
    })
  })

  describe('when destroying', function () {
    beforeEach(() => {
      customWorkspaceView = new cwv.CustomWorkspaceView(
        logger,
        search,
        windowSelector,
        stage,
        workspaces,
        workspaceManager,
        keys,
        overview,
        keySymbols,
        ignoredKeySymbols,
        settings
      )
      customWorkspaceView._onDestroy()
    })

    it('enables search', function () {
      expect(search.enable).toHaveBeenCalled()
    })

    it('resets window selector', function () {
      expect(windowSelector.reset).toHaveBeenCalled()
    })

    it('unbinds stage key event', function () {
      expect(stage.disconnect).toHaveBeenCalledTimes(2)
    })

    describe('on first window', function () {
      beforeEach(() => {
        customWorkspaceView = new cwv.CustomWorkspaceView(
          logger,
          search,
          windowSelector,
          stage,
          workspaces,
          workspaceManager,
          keys,
          overview,
          keySymbols,
          ignoredKeySymbols,
          settings
        )
        workspaceManager.active_workspace_index = 0
        workspaces[0].monitorIndex = 0
      })

      describe("when on key press with 'k'", () => {
        beforeEach(() =>
          customWorkspaceView.onKeyPress('', {
            get_key_symbol: () => 'k'
          })
        )

        it('selects using window selector', () => {
          expect(windowSelector.select).toHaveBeenCalledWith('k')
        })
      })
    })
  })
})
