export var PROPERTIES = {
  SHOW_OVERVIEW_WHEN_CHANGE_WORKSPACE_KEY: 'show-overview-when-change-workspace',
  SHOW_WINDOW_SELECTOR_WHEN_SHOW_OVERVIEW: 'show-window-selector-when-show-overview',
  LOGGING: 'logging',
  HINT_BACKGROUND_COLOR: 'background-color',
  HINT_CLOSING_FONT_COLOR: 'closing-font-color',
  HINT_FONT_COLOR: 'font-color',
  HINT_BORDER_COLOR: 'border-color',
  HINT_BORDER_SIZE: 'border-size'
}

export var Settings = class Settings {
  constructor (gioSettings, gioFlag) {
    this.gioFlag = gioFlag
    this.gioSettings = gioSettings
    this.showOverviewOnSwitchWorkspace = true
  }

  isShowOverviewOnSwitchWorkspace () {
    return this.gioSettings.get_boolean(PROPERTIES.SHOW_OVERVIEW_WHEN_CHANGE_WORKSPACE_KEY)
  }

  isShowWindowSelectorWhenShowOverview () {
    return this.gioSettings.get_boolean(PROPERTIES.SHOW_WINDOW_SELECTOR_WHEN_SHOW_OVERVIEW)
  }

  isLogging () {
    return this.gioSettings.get_boolean(PROPERTIES.LOGGING)
  }

  getBackgroundColor () {
    return this.getStringProperty(PROPERTIES.HINT_BACKGROUND_COLOR)
  }

  getClosingFontColor () {
    return this.getStringProperty(PROPERTIES.HINT_CLOSING_FONT_COLOR)
  }

  getFontColor () {
    return this.getStringProperty(PROPERTIES.HINT_FONT_COLOR)
  }

  getBorderColor () {
    return this.getStringProperty(PROPERTIES.HINT_BORDER_COLOR)
  }

  getBorderSize () {
    return this.getNumberProperty(PROPERTIES.HINT_BORDER_SIZE)
  }

  getStringProperty (key) {
    return this.gioSettings.get_string(key)
  }

  updateStringProperty (key, property) {
    return this.gioSettings.set_string(key, property)
  }

  getNumberProperty (key) {
    return this.gioSettings.get_int(key)
  }

  updateNumberProperty (key, property) {
    return this.gioSettings.set_int(key, property)
  }

  bind (key, object, property) {
    this.gioSettings.bind(key, object, property, this.gioFlag)
  }
}
