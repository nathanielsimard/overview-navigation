/* global describe */
/* global beforeEach */
/* global it */
/* global expect */
require('./helpers/core')

const searchMock = require('./helpers/searchMock')
const stageMock = require('./helpers/stageMock')
const windowSelectorMock = require('./helpers/windowSelectorMock')
const settingsStub = require('./helpers/settingsStub.js')
const workspaceManagerStub = require('./helpers/workspaceManagerStub.js')
const workspaceMock = require('./helpers/workspaceMock.js')
const selectedWindowMock = require('./helpers/selectedWindowMock')
const windowOverlayMock = require('./helpers/windowOverlayMock')

const { MODE } = require('../src/mode')
const log = require('../src/utils')
const cwv = require('../src/customWorkspaceView')
const {
  CustomWindowOverlaySubject
} = require('../src/subject/customWindowOverlaySubject')

const FOCUS_KEY = 'focusKey'
const CLOSING_KEY = 'closingKey'

describe('Custom Workspace View', function () {
  let windowOverlay
  let otherWindowOverlay

  let logger
  let search
  let windowSelector
  let stage
  let workspaces
  let workspaceManager
  let keys
  let settings
  let customWorkspaceView
  let overlays

  beforeEach(function () {
    windowOverlay = windowOverlayMock.create()
    otherWindowOverlay = windowOverlayMock.create()
    overlays = new CustomWindowOverlaySubject()
    overlays.addWindow(windowOverlay)
    overlays.addWindow(otherWindowOverlay)

    logger = new log.TestLogger('CustomWorkspaceViewTest', false)
    search = searchMock.create()
    windowSelector = windowSelectorMock.create()
    stage = stageMock.create()
    workspaces = [workspaceMock.create()]
    workspaceManager = workspaceManagerStub.create()
    keys = {
      KEY_space: FOCUS_KEY,
      KEY_Shift_L: CLOSING_KEY,
      KEY_Shift_R: CLOSING_KEY
    }
    settings = settingsStub.create()

    customWorkspaceView = new cwv.CustomWorkspaceView(
      logger,
      search,
      windowSelector,
      stage,
      workspaces,
      workspaceManager,
      keys,
      settings,
      overlays
    )
  })

  describe("with settings 'Show Window Selector When Show Overview'=true", () => {
    beforeEach(() => (settings.showWindowSelectorWhenShowOverview = true))

    describe('when animate to overview', () => {
      beforeEach(() => customWorkspaceView.animateToOverview())

      it('disables search', () => {
        expect(search.disable).toHaveBeenCalled()
      })

      it('shows tooltips', () => {
        expect(windowOverlay.showTooltip).toHaveBeenCalled()
        expect(otherWindowOverlay.showTooltip).toHaveBeenCalled()
      })
    })
  })

  describe("with settings 'Show Window Selector When Show Overview'=false", () => {
    beforeEach(() => (settings.showWindowSelectorWhenShowOverview = false))

    describe('when animate to overview', () => {
      beforeEach(() => customWorkspaceView.animateToOverview())

      it('enables search', function () {
        expect(search.enable).toHaveBeenCalled()
      })

      it('hides tooltips', () => {
        expect(windowOverlay.hideTooltip).toHaveBeenCalled()
        expect(otherWindowOverlay.hideTooltip).toHaveBeenCalled()
      })
    })
  })

  describe('when animate to overview', () => {
    beforeEach(() => customWorkspaceView.animateToOverview())

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
        settings,
        overlays
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
        settings,
        overlays
      )
      workspaceManager.active_workspace_index = 0
      workspaces[0].monitorIndex = 0
    })

    describe("when on key press with 'a'", () => {
      let selectedWindow

      beforeEach(() => {
        selectedWindow = selectedWindowMock.create()
        windowSelector.select.and.returnValue(selectedWindow)

        customWorkspaceView.onKeyPress('', {
          get_key_symbol: () => 'a'
        })
      })

      it('selects window selector with focussing mode', () => {
        expect(windowSelector.select).toHaveBeenCalledWith('a', MODE.Focussing)
      })

      it('activate selected window', () => {
        expect(selectedWindow.activate).toHaveBeenCalled()
      })
    })

    describe("when on key press with 'a' and CLOSING KEY", () => {
      let selectedWindow

      beforeEach(() => {
        selectedWindow = selectedWindowMock.create()
        windowSelector.select.and.returnValue(selectedWindow)

        customWorkspaceView.onKeyPress('', {
          get_key_symbol: () => CLOSING_KEY
        })
        customWorkspaceView.onKeyPress('', {
          get_key_symbol: () => 'a'
        })
      })

      it('selects window selector with closing mode', () => {
        expect(windowSelector.select).toHaveBeenCalledWith('a', MODE.Closing)
      })

      it('activate selected window', () => {
        expect(selectedWindow.activate).toHaveBeenCalled()
      })
    })

    describe('when on key release one time with the focus key', () => {
      beforeEach(() =>
        customWorkspaceView.onKeyRelease('', {
          get_key_symbol: () => FOCUS_KEY
        })
      )

      it('hides tooltips', () => {
        expect(windowOverlay.hideTooltip).toHaveBeenCalled()
        expect(otherWindowOverlay.hideTooltip).toHaveBeenCalled()
      })

      it('enables search', function () {
        expect(search.enable).toHaveBeenCalled()
      })

      it('Should reset selection of window selector', function () {
        expect(windowSelector.resetSelection).toHaveBeenCalled()
      })
    })

    describe('when on key release two times with the focus key', () => {
      beforeEach(() => {
        customWorkspaceView.onKeyRelease('', {
          get_key_symbol: () => FOCUS_KEY
        })
        customWorkspaceView.onKeyRelease('', {
          get_key_symbol: () => FOCUS_KEY
        })
      })

      it('shows tooltips', () => {
        expect(windowOverlay.showTooltip).toHaveBeenCalled()
        expect(otherWindowOverlay.showTooltip).toHaveBeenCalled()
      })

      it('disable search', function () {
        expect(search.disable).toHaveBeenCalled()
      })
    })

    describe('when on key release with the closing key', () => {
      beforeEach(() =>
        customWorkspaceView.onKeyRelease('', {
          get_key_symbol: () => CLOSING_KEY
        })
      )

      it('hides tooltips closing', () => {
        expect(windowOverlay.hideTooltipClosing).toHaveBeenCalled()
        expect(otherWindowOverlay.hideTooltipClosing).toHaveBeenCalled()
      })
    })

    describe('when on key press with the closing key', () => {
      beforeEach(() =>
        customWorkspaceView.onKeyPress('', {
          get_key_symbol: () => CLOSING_KEY
        })
      )

      it('show tooltips closing', () => {
        expect(windowOverlay.showTooltipClosing).toHaveBeenCalled()
        expect(otherWindowOverlay.showTooltipClosing).toHaveBeenCalled()
      })
    })
  })
})
