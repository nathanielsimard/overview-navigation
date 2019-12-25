/* global describe */
/* global beforeEach */
/* global it */
/* global expect */
require('../helpers/core')

const loggerMock = require('../helpers/loggerMock')
const labelMock = require('../helpers/labelMock')
const windowSelectorMock = require('../helpers/windowSelectorMock')
const OverlaysMock = require('../helpers/subject/customWindowOverlaySubjectMock')
const settingsStub = require('../helpers/settingsStub.js')

const CustomWindowOverlay = require('../../src/window/customWindowOverlay')

describe('Custom Window Overlay', () => {
  const PADDING = 3

  let overlays
  let logger
  let label
  let metaWindow
  let windowSelector
  let customWindowOverlay
  let windowClone
  let settings

  beforeEach(() => {
    overlays = OverlaysMock.create()
    logger = loggerMock.create()
    windowSelector = windowSelectorMock.create()
    label = labelMock.create()
    metaWindow = {}
    windowClone = {}
    settings = settingsStub.create()

    customWindowOverlay = new CustomWindowOverlay.CustomWindowOverlay(
      logger,
      windowSelector,
      label,
      windowClone,
      metaWindow,
      PADDING,
      overlays,
      settings
    )
  })

  it('registers meta window', () => {
    expect(windowSelector.registerWindow).toHaveBeenCalled()
  })

  describe('when destroying', () => {
    beforeEach(() => {
      customWindowOverlay._onDestroy(logger, label)
    })

    it('destroy label', () => {
      expect(label.destroy).toHaveBeenCalled()
    })

    it('should call overlays window deleted', () => {
      expect(overlays.removeWindow).toHaveBeenCalledWith(customWindowOverlay)
    })
  })

  describe('when re-calculating layout with 3 padding at position x=200, y=300', () => {
    beforeEach(() => {
      windowClone.slot = [200, 300]
      customWindowOverlay.relayout(false)
    })

    it('set label position to x=203, y=303', () => {
      expect(label.setPosition).toHaveBeenCalledWith(203, 303)
    })
  })

  describe('when showing tooltip', () => {
    beforeEach(() => {
      customWindowOverlay.showTooltip()
    })

    it('shows label', () => {
      expect(label.show).toHaveBeenCalled()
    })

    it('raises label on top', () => {
      expect(label.raiseTop).toHaveBeenCalled()
    })
  })

  describe('When showing closing tooltip', () => {
    const labelText = 'aa'
    const closingFontColor = 'closingFontColor'

    beforeEach(() => {
      label.text = labelText
      settings.closingFontColor = 'closingFontColor'
      customWindowOverlay.showTooltipClosing()
    })

    it('Should set label style class name', () => {
      expect(label.updateFontColor).toHaveBeenCalledWith(closingFontColor)
    })

    it('Should upper case label text', () => {
      expect(label.setText).toHaveBeenCalledWith(labelText.toUpperCase())
    })
  })

  describe('When hiding closing tooltip', () => {
    const labelText = 'AA'
    const fontColor = 'fontColor'

    beforeEach(() => {
      label.text = labelText
      settings.fontColor = fontColor
      customWindowOverlay.hideTooltipClosing()
    })

    it('Should set label style class name', () => {
      expect(label.updateFontColor).toHaveBeenCalledWith(fontColor)
    })

    it('Should lower case label text', () => {
      expect(label.setText).toHaveBeenCalledWith(labelText.toLowerCase())
    })
  })
})
