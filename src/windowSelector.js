class WindowSelector {
  constructor (keySymbols, logger) {
    this.keySymbols = keySymbols
    this.logger = logger
    this.keys = Object.keys(keySymbols)
    this.reset()
  }

  select (keySymbol) {
    const key = this.keySymbols[keySymbol]
    if (key === undefined) {
      return false
    }

    this.selections = this.selections + key

    if (this.selections.length < this._calculateTagLenght()) {
      return false
    }

    this.logger.debug(`Selections ${this.selections}`)
    const selectedWindow = this.selectedWindows[this.selections]

    if (!selectedWindow) {
      this.logger.debug(
        `No window found for selections ${
          this.selections
        }, resetting selection ...`
      )
      this.resetSelection()
      return false
    }

    this.logger.debug(`Selecting window ${this.selections} ...`)
    selectedWindow.activate()
    return true
  }

  registerWindow (window, callback) {
    if (this.index === this.keys.length) {
      this._updateSelectedWindowsToNewTagsSize()
    }

    const tag = this._generateTag(this.index++)
    this.selectedWindows[tag] = new SelectedWindow(window, callback)
    callback(tag)
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
      return `${this.keySymbols[this.keys[index]]}`
    } else {
      this.logger.debug(`div: ${div - 1} mod: ${mod}`)
      return `${this.keySymbols[this.keys[div - 1]]}${
        this.keySymbols[this.keys[mod]]
      }`
    }
  }

  _calculateTagLenght () {
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
      selectedWindow.updateName(newTag)
    }

    this.selectedWindows = newSelectedWindows
  }
}

class SelectedWindow {
  constructor (window, updateLabelCallback) {
    this.window = window
    this.updateLabelCallback = updateLabelCallback
  }

  updateName (name) {
    this.updateLabelCallback(name)
  }

  activate () {
    const time = global.get_current_time()
    this.window.activate(time)
  }
}

if (global.overviewNavigationTesting) {
  module.export = { WindowSelector }
}
