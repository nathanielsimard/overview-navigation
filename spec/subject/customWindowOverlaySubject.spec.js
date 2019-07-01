/* global describe */
/* global beforeEach */
/* global it */
/* global expect */
require('../helpers/core')

const ListenerMock = require('../helpers/listenerMock')
const { CustomWindowOverlaySubject } = require('../../src/subject/customWindowOverlaySubject')

describe('Custom Window Overlay Listener', () => {
  let listener
  let otherListener
  let overlays

  beforeEach(() => {
    overlays = new CustomWindowOverlaySubject()
  })

  beforeEach(() => {
    listener = ListenerMock.create()
    otherListener = ListenerMock.create()
    overlays.attach(listener)
    overlays.attach(otherListener)
  })

  describe('when a new window is added', () => {
    const window = {}

    beforeEach(() => {
      overlays.addWindow(window)
    })

    it('should be added', () => {
      expect(overlays.getAllWindows().length).toEqual(1)
    })

    it('should notified listeners', () => {
      expect(listener.onWindowCreated).toHaveBeenCalledWith(window)
      expect(otherListener.onWindowCreated).toHaveBeenCalledWith(window)
    })

    describe('when is removed', () => {
      beforeEach(() => {
        overlays.removeWindow(window)
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
