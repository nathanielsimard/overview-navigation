class Settings {
  constructor () {
    this.showOverviewOnSwitchWorkspace = undefined
    this.showWindowSelectorWhenShowOverview = undefined
    this.debug = undefined
  }
  isShowOverviewOnSwitchWorkspace () {
    return this.showOverviewOnSwitchWorkspace
  }

  isShowWindowSelectorWhenShowOverview () {
    return this.showWindowSelectorWhenShowOverview
  }

  isDebug () {
    return this.debug
  }
}

function create () {
  return new Settings()
}

module.exports = { create }
