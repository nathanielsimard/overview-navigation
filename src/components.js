const { St } = require('gi')

var FOCUS_WINDOW_STYLE = 'extension-overview-navigation-window-tooltip'

var Label = class Label {
  constructor (settings, parent) {
    this.settings = settings
    this.gLabel = new St.Label({ })
    this.gLabel.set_style_class_name(FOCUS_WINDOW_STYLE)

    parent.add_actor(this.gLabel)
  }

  updateFontColor (color) {
    this._setLabelStyle(color)
  }

  getText () {
    return this.gLabel.text
  }

  setText (text) {
    this.gLabel.text = text
  }

  destroy () {
    this.gLabel.destroy()
  }

  setPosition (x, y) {
    this.gLabel.set_position(x, y)
  }

  raiseTop () {
    this.gLabel.raise_top()
  }

  show () {
    this.gLabel.show()
  }

  hide () {
    this.gLabel.hide()
  }

  _setLabelStyle (fontColor) {
    this.gLabel.set_style(`
      background: ${this.settings.getBackgroundColor()};
      color: ${fontColor};
      border: ${this.settings.getBorderSize()} solid ${this.settings.getBorderColor()};
    `)
  }
}

module.exports = {
  Label
}
