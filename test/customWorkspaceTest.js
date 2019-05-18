/* global describe */
/* global beforeEach */
/* global it */
/* global expect */
require('./helpers/core')

const loggerMock = require('./helpers/loggerMock')
const windowOverlayMock = require('./helpers/windowOverlayMock')
const CustomWorkspace = require('../src/customWorkspace')

describe('Custom Workspace', () => {
  let windowOverlay
  let otherWindowOverlay
  let logger
  let customWorkspace

  beforeEach(() => {
    logger = loggerMock.create()
    windowOverlay = windowOverlayMock.create()
    otherWindowOverlay = windowOverlayMock.create()
    customWorkspace = new CustomWorkspace.CustomWorkspace(logger, [
      windowOverlay,
      otherWindowOverlay
    ])
  })

  describe('when show windows tooltips', () => {
    beforeEach(() => {
      customWorkspace.showWindowsTooltips()
    })

    it('should show window overlay tooltip', () => {
      expect(windowOverlay.showTooltip).toHaveBeenCalled()
      expect(otherWindowOverlay.showTooltip).toHaveBeenCalled()
    })
  })

  describe('when hide windows tooltips', () => {
    beforeEach(() => {
      customWorkspace.hideWindowsTooltips()
    })

    it('should hide windows overlay tooltip', () => {
      expect(windowOverlay.hideTooltip).toHaveBeenCalled()
      expect(otherWindowOverlay.hideTooltip).toHaveBeenCalled()
    })
  })

  describe('when show windows tooltips closing', () => {
    beforeEach(() => {
      customWorkspace.showWindowsTooltipsClosing()
    })

    it('should show windows overlay tooltip closing', () => {
      expect(windowOverlay.showTooltipClosing).toHaveBeenCalled()
      expect(otherWindowOverlay.showTooltipClosing).toHaveBeenCalled()
    })
  })

  describe('when hide windows tooltips closing', () => {
    beforeEach(() => {
      customWorkspace.hideWindowsTooltipsClosing()
    })

    it('should hide windows overlay tooltip closing', () => {
      expect(windowOverlay.hideTooltipClosing).toHaveBeenCalled()
      expect(otherWindowOverlay.hideTooltipClosing).toHaveBeenCalled()
    })
  })
})
