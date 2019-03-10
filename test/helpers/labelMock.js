/* eslint-disable camelcase */
/* global spyOn */
class Label {
  destroy () {}
  set_position (x, y) {}
  raise_top () {}
  show () {}
}

function create () {
  const label = new Label()
  spyOn(label, 'destroy')
  spyOn(label, 'set_position')
  spyOn(label, 'raise_top')
  spyOn(label, 'show')
  return label
}

module.exports = { create }
