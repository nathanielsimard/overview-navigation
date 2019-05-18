class WindowSelector {
  constructor (focusKeySymbols, logger, overview, selectedWindowFactory, MODE) {
    this.focusKeySymbols = focusKeySymbols
    this.overview = overview
    this.logger = logger
    this.selectedWindowFactory = selectedWindowFactory
    this.keys = Object.keys(focusKeySymbols)
    this.MODE = MODE
    this.reset()
  }

  select (keySymbol, mode) {
    this.logger.debug(`Selecting a window ${keySymbol}`)

    let key = this.focusKeySymbols[keySymbol]

    this.logger.debug(`Key is window ${key}`)
    if (key === undefined) {
      return
    }

    this.selections = this.selections + key

    this.logger.debug(`Selection is  ${this.selections}`)
    if (this.selections.length < this._calculateTagLength()) {
      return
    }

    this.logger.debug(`Selections ${this.selections}`)

    let selectedWindow = this.selectedWindows[this.selections]

    if (!selectedWindow) {
      this.logger.debug(`Event with close`)
      this.resetSelection()
      return
    }

    this.logger.debug(`Selecting window ${this.selections} ...`)
    if (this.MODE.Closing === mode) {
      selectedWindow.toBeClose()
    } else {
      selectedWindow.toBeFocus()
    }

    this.resetSelection()
    return selectedWindow
  }

  registerWindow (window, callback) {
    this.logger.debug('Registering a window ...')

    if (this.index === this.keys.length) {
      this._updateSelectedWindowsToNewTagsSize()
    }

    const tag = this._generateTag(this.index++)
    const selectedWindow = this.selectedWindowFactory.create(
      window,
      callback,
      this.overview
    )
    this.selectedWindows[tag] = selectedWindow
    selectedWindow.updateTag(tag)
  }

  reset () {
    this.logger.debug('Resetting ...')

    this.selectedWindows = {}
    this.index = 0
    this.resetSelection()
  }

  resetSelection () {
    this.selections = ''
  }

  _generateTag (index) {
    const div = Math.floor(index / this.keys.length)
    const mod = index % this.keys.length

    if (div === 0) {
      const tag = `${this.focusKeySymbols[this.keys[index]]}`

      this.logger.debug(`Generating tag : ${tag}`)
      return tag
    } else {
      this.logger.debug(`div: ${div - 1} mod: ${mod}`)
      return `${this.focusKeySymbols[this.keys[div - 1]]}${
        this.focusKeySymbols[this.keys[mod]]
      }`
    }
  }

  _calculateTagLength () {
    if (Math.floor(this.index / this.keys.length) === 0) {
      return 1
    } else {
      return 2
    }
  }

  _updateSelectedWindowsToNewTagsSize () {
    const newSelectedWindows = {}
    const tagKeys = Object.keys(this.selectedWindows)

    for (let i = 0; i < tagKeys.length; i++) {
      const selectedWindow = this.selectedWindows[tagKeys[i]]
      const newTag = this._generateTag(this.index++)

      newSelectedWindows[newTag] = selectedWindow
      selectedWindow.updateTag(newTag)
    }

    this.selectedWindows = newSelectedWindows
  }
}

if (global.overviewNavigationTesting) {
  module.exports = { WindowSelector }
} else {
  /*eslint-disable */
  const Main = imports.ui.main
  const ExtensionUtils = imports.misc.extensionUtils
  const OverviewNavigation = ExtensionUtils.getCurrentExtension()
  const SelectedWindow = OverviewNavigation.imports.selectedWindow
  const Mode = OverviewNavigation.imports.mode

  function create(focusKeySymbols, logger) {
    /* eslint-enable */
    return new WindowSelector(
      focusKeySymbols,
      logger,
      Main.overview,
      new SelectedWindow.Factory(),
      Mode.MODE
    )
  }
}
