/* global describe */
/* global beforeEach */
/* global it */
/* global expect */
require('./helpers/core')

const { CustomWindowOverlays } = require('../src/customWindowOverlays')

describe('Custom Window Overlay Listener', () => {
  let overlays

  beforeEach(() => {
    overlays = new CustomWindowOverlays()
  })

  describe('when a new window is register', () => {
    const window = {}

    beforeEach(() => {
      overlays.onWindowCreated(window)
    })

    it('should be added', () => {
      expect(overlays.getAllWindows().length).toEqual(1)
    })

    describe('than is deleted', () => {
      beforeEach(() => {
        overlays.onWindowDeleted(window)
      })

      it('should remove the window', () => {
        expect(overlays.getAllWindows().length).toEqual(0)
      })
    })
  })
})
