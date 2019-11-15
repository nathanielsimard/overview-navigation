const { MODE } = require('../mode')

var WindowSelector = class WindowSelector {
  constructor(keySymbols, tagGenerator, logger, overview, selectedWindowFactory) {
    this.keySymbols = keySymbols
    this.tagGenerator = tagGenerator
    this.overview = overview
    this.logger = logger
    this.selectedWindowFactory = selectedWindowFactory

    this.reset()
  }

  select(keySymbol, mode) {
    this.logger.debug(`Selecting a window ${keySymbol} with mode ${mode}`)

    let key = this.keySymbols[keySymbol]

    this.logger.debug(`Key is window ${key}`)
    if (key === undefined) {
      return
    }

    this.selections = this.selections + key

    this.logger.debug(`Selection is  ${this.selections}`)
    if (this.selections.length < this.tagGenerator.calculateTagLength(this.index)) {
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
    if (MODE.Closing === mode) {
      selectedWindow.toBeClose()
    } else {
      selectedWindow.toBeFocus()
    }

    this.resetSelection()
    return selectedWindow
  }

  registerWindow(window, callback) {
    this.logger.debug('Registering a window ...')

    if (this.tagGenerator.isMaximumIndex(this.index)) {
      this._updateSelectedWindowsToNewTagsSize()
    }

    const tag = this.tagGenerator.generate(this.index++)
    const selectedWindow = this.selectedWindowFactory.create(window, callback, this.overview)
    this.selectedWindows[tag] = selectedWindow
    selectedWindow.updateTag(tag)
  }

  reset() {
    this.logger.debug('Resetting ...')

    this.selectedWindows = {}
    this.index = 0
    this.resetSelection()
  }

  resetSelection() {
    this.selections = ''
  }

  _updateSelectedWindowsToNewTagsSize() {
    const newSelectedWindows = {}
    const tagKeys = Object.keys(this.selectedWindows)

    for (let i = 0; i < tagKeys.length; i++) {
      const selectedWindow = this.selectedWindows[tagKeys[i]]
      const newTag = this.tagGenerator.generate(this.index++)

      newSelectedWindows[newTag] = selectedWindow
      selectedWindow.updateTag(newTag)
    }

    this.selectedWindows = newSelectedWindows
  }
}

if (!global.overviewNavigationTesting) {
  /*eslint-disable */
  const { overview } = require('ui/main')
  const { Factory } = require('./selectedWindow')

  function create(keySymbols, tagGenerator, logger) {
    /* eslint-enable */
    return new WindowSelector(keySymbols, tagGenerator, logger, overview, new Factory())
  }
}

module.exports = { WindowSelector }
