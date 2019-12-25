class Settings {
  constructor () {
    this.showOverviewOnSwitchWorkspace = undefined
    this.showWindowSelectorWhenShowOverview = undefined
    this.fontColor = undefined
    this.logging = undefined
    this.backgroundColor = undefined
    this.closingFontColor = undefined
  }

  isShowOverviewOnSwitchWorkspace () {
    return this.showOverviewOnSwitchWorkspace
  }

  isShowWindowSelectorWhenShowOverview () {
    return this.showWindowSelectorWhenShowOverview
  }

  isLogging () {
    return this.logging
  }

  getFontColor () {
    return this.fontColor
  }

  getBackgroundColor () {
    return this.backgroundColor
  }

  getClosingFontColor () {
    return this.closingFontColor
  }
}

function create () {
  return new Settings()
}

module.exports = { create }
