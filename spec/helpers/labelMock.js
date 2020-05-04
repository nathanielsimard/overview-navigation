/* eslint-disable camelcase */
/* global spyOn */
class Label {
  constructor () {
    this.text = 'notset'
  }

  updateFontColor (color) { }

  getText () {
    return this.text
  }

  setText (text) {
    this.text = text
  }

  destroy () { }

  setPosition (x, y) { }

  show () { }

  hide () { }
}

function create () {
  const label = new Label()
  spyOn(label, 'updateFontColor')
  spyOn(label, 'setText')
  spyOn(label, 'destroy')
  spyOn(label, 'setPosition')
  spyOn(label, 'show')
  spyOn(label, 'hide')
  return label
}

module.exports = { create }
