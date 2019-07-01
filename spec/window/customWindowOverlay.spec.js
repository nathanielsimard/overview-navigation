/* global describe */
/* global beforeEach */
/* global it */
/* global expect */
require('../helpers/core')

const loggerMock = require('../helpers/loggerMock')
const labelMock = require('../helpers/labelMock')
const windowSelectorMock = require('../helpers/windowSelectorMock')
const actorMock = require('../helpers/actorMock')
const OverlaysMock = require('../helpers/subject/customWindowOverlaySubjectMock')

const CustomWindowOverlay = require('../../src/window/customWindowOverlay')

describe('Custom Window Overlay', () => {
  const PADDING = 3

  let overlays
  let logger
  let label
  let parentActor
  let metaWindow
  let windowSelector
  let customWindowOverlay
  let windowClone

  beforeEach(() => {
    overlays = OverlaysMock.create()
    logger = loggerMock.create()
    windowSelector = windowSelectorMock.create()
    label = labelMock.create()
    parentActor = actorMock.create()
    metaWindow = {}
    windowClone = {}
    customWindowOverlay = new CustomWindowOverlay.CustomWindowOverlay(
      logger,
      windowSelector,
      label,
      parentActor,
      windowClone,
      metaWindow,
      PADDING,
      overlays
    )
  })

  it('adds label to parent actor', () => {
    expect(parentActor.add_actor).toHaveBeenCalledWith(label)
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
      expect(label.set_position).toHaveBeenCalledWith(203, 303)
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
      expect(label.raise_top).toHaveBeenCalled()
    })
  })

  describe('When showing closing tooltip', () => {
    const labelText = 'aa'
    beforeEach(() => {
      label.text = labelText
      customWindowOverlay.showTooltipClosing()
    })

    it('Should set label style class name', () => {
      expect(label.set_style_class_name).toHaveBeenCalledWith(
        CustomWindowOverlay.CLOSING_WINDOW_STYLE
      )
    })

    it('Should upper case label text', () => {
      expect(label.text).toEqual(labelText.toUpperCase())
    })
  })

  describe('When hiding closing tooltip', () => {
    const labelText = 'AA'
    beforeEach(() => {
      label.text = labelText
      customWindowOverlay.hideTooltipClosing()
    })

    it('Should set label style class name', () => {
      expect(label.set_style_class_name).toHaveBeenCalledWith(
        CustomWindowOverlay.FOCUS_WINDOW_STYLE
      )
    })

    it('Should lower case label text', () => {
      expect(label.text).toEqual(labelText.toLowerCase())
    })
  })
})
