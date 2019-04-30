class SelectedWindow {
  constructor (window, updateLabelCallback, overview) {
    this.window = window
    this.updateLabelCallback = updateLabelCallback
    this.overview = overview
  }

  updateTag (tag) {
    const name = `[Focus: ${tag} ][Close: ${tag.toUpperCase()} ]`
    this.updateLabelCallback(name)
  }

  close () {
    const time = global.get_current_time()
    this.window.delete(time)
  }

  focus () {
    const time = global.get_current_time()
    this.window.activate(time)
    this.overview.hide()
  }

  toBeFocus () {
    this.activate = this.focus
  }

  toBeClose () {
    this.activate = this.close
  }
}

class Factory {
  create (window, updateLabelCallback, overview) {
    return new SelectedWindow(window, updateLabelCallback, overview)
  }
}

if (global.overviewNavigationTesting) {
  module.exports = { Factory, SelectedWindow }
}
