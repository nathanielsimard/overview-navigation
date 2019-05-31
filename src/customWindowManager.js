class CustomWindowManager {
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

if (!global.overviewNavigationTesting) {
  const WindowManager = require('ui/windowManager')
  const Main = require('ui/main')

  /*eslint-disable */
  function initialize(injector, search, settings) {
    /* eslint-enable */
    injector.inject(
      CustomWindowManager,
      WindowManager.WindowManager,
      parent => {
        return new CustomWindowManager(search, Main.overview, settings)
      }
    )
  }
} else {
  module.exports = { CustomWindowManager }
}
