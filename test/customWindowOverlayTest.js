/* global describe */
/* global beforeEach */
/* global it */
/* global expect */
require('./helpers/core')

const loggerMock = require('./helpers/loggerMock')
const labelMock = require('./helpers/labelMock')
const windowSelectorMock = require('./helpers/windowSelectorMock')
const actorMock = require('./helpers/actorMock')
const CustomWindowOverlay = require('../src/customWindowOverlay')

describe('Custom Window Overlay', function () {
  const PADDING = 3

  let logger
  let label
  let parentActor
  let metaWindow
  let windowSelector
  let customWindowOverlay
  let windowClone

  beforeEach(function () {
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
      PADDING
    )
  })

  it('adds label to parent actor', function () {
    expect(parentActor.add_actor).toHaveBeenCalledWith(label)
  })

  it('registers meta window', function () {
    expect(windowSelector.registerWindow).toHaveBeenCalled()
  })

  describe('when destroying', function () {
    beforeEach(function () {
      customWindowOverlay._onDestroy(logger, label)
    })

    it('destroy label', function () {
      expect(label.destroy).toHaveBeenCalled()
    })
  })

  describe('when re-calculating layout with 3 padding at position x=200, y=300', function () {
    beforeEach(function () {
      windowClone.slot = [200, 300]
      customWindowOverlay.relayout(false)
    })

    it('set label position to x=203, y=303', function () {
      expect(label.set_position).toHaveBeenCalledWith(203, 303)
    })
  })

  describe('when showing tooltip', function () {
    beforeEach(function () {
      customWindowOverlay.showTooltip()
    })

    it('shows label', function () {
      expect(label.show).toHaveBeenCalled()
    })

    it('raises label on top', function () {
      expect(label.raise_top).toHaveBeenCalled()
    })
  })
})
