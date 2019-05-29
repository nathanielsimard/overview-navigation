/* global describe */
/* global beforeEach */
/* global it */
/* global expect */
require('./helpers/core')

const ListenerMock = require('./helpers/listenerMock')
const { CustomWindowOverlays } = require('../src/customWindowOverlays')

describe('Custom Window Overlay Listener', () => {
  let listener
  let otherListener
  let overlays

  beforeEach(() => {
    overlays = new CustomWindowOverlays()
  })

  beforeEach(() => {
    listener = ListenerMock.create()
    otherListener = ListenerMock.create()
    overlays.register(listener)
    overlays.register(otherListener)
  })

  describe('when a new window is created', () => {
    const window = {}

    beforeEach(() => {
      overlays.onWindowCreated(window)
    })

    it('should be added', () => {
      expect(overlays.getAllWindows().length).toEqual(1)
    })

    it('should notified listeners', () => {
      expect(listener.onWindowCreated).toHaveBeenCalledWith(window)
      expect(otherListener.onWindowCreated).toHaveBeenCalledWith(window)
    })

    describe('when is deleted', () => {
      beforeEach(() => {
        overlays.onWindowDeleted(window)
      })

      it('should remove the window', () => {
        expect(overlays.getAllWindows().length).toEqual(0)
      })

      it('should notified listeners', () => {
        expect(listener.onWindowDeleted).toHaveBeenCalledWith(window)
        expect(otherListener.onWindowDeleted).toHaveBeenCalledWith(window)
      })
    })
  })
})
