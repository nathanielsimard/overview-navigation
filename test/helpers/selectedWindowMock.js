/* global spyOn */
class SelectedWindow {
  activate () {}
  toBeFocus () {}
  toBeClose () {}
  updateTag (tag) {}
}

function create () {
  const selectedWindow = new SelectedWindow()
  spyOn(selectedWindow, 'activate')
  spyOn(selectedWindow, 'updateTag')
  spyOn(selectedWindow, 'toBeFocus')
  spyOn(selectedWindow, 'toBeClose')
  return selectedWindow
}

class Factory {
  create (window, updateLabelCallback, overview) {
    return create()
  }
}
function createFactory () {
  const factory = new Factory()
  spyOn(factory, 'create')
  return factory
}

module.exports = { create, createFactory }
