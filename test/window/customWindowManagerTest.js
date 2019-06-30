/* global describe */
/* global beforeEach */
/* global it */
/* global expect */
require('../helpers/core')

const searchMock = require('../helpers/searchMock')
const overviewMock = require('../helpers/overviewMock')
const customWindowManager = require('../src/window/customWindowManager')
const settingsStub = require('../helpers/settingsStub.js')

describe('Custom Window Manager', function () {
  let overview
  let search
  let wm
  let settings

  beforeEach(function () {
    overview = overviewMock.create()
    search = searchMock.create()
    settings = settingsStub.create()
    wm = new customWindowManager.CustomWindowManager(search, overview, settings)
  })

  describe('given show overview on switch workspace activated', function () {
    beforeEach(function () {
      settings.showOverviewOnSwitchWorkspace = true
    })

    describe('when show overview', function () {
      beforeEach(function () {
        wm.actionMoveWorkspace()
      })

      it('should show overview', function () {
        expect(overview.show).toHaveBeenCalled()
      })

      it('should disable search', function () {
        expect(search.disable).toHaveBeenCalled()
      })
    })
  })

  describe('given show overview on switch workspace not activated', function () {
    beforeEach(function () {
      settings.showOverviewOnSwitchWorkspace = false
    })

    describe('when show overview', function () {
      beforeEach(function () {
        wm.actionMoveWorkspace()
      })

      it('should not show overview', function () {
        expect(overview.show).toHaveBeenCalledTimes(0)
      })

      it('should not disable search', function () {
        expect(search.disable).toHaveBeenCalledTimes(0)
      })
    })
  })
})
