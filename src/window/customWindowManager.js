var CustomWindowManager = class CustomWindowManager {
  constructor (search, overview, settings) {
    this.search = search
    this.overview = overview
    this.settings = settings
  }

  actionMoveWorkspace () {
    if (!this.settings.isShowOverviewOnSwitchWorkspace()) {
      return
    }

    this.search.disable()
    this.overview.show()
  }
}

module.exports = { CustomWindowManager }
