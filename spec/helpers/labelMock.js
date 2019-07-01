/* eslint-disable camelcase */
/* global spyOn */
class Label {
  destroy () {}
  set_position (x, y) {}
  raise_top () {}
  show () {}
  set_style_class_name (className) {}
}

function create () {
  const label = new Label()
  spyOn(label, 'destroy')
  spyOn(label, 'set_position')
  spyOn(label, 'raise_top')
  spyOn(label, 'show')
  spyOn(label, 'set_style_class_name')
  return label
}

module.exports = { create }
