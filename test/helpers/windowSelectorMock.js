/* global spyOn */
class WindowSelector {
  registerWindow (metaWindow, callback) {}
  reset () {}
  resetSelection () {}
}

function create () {
  const windowSelector = new WindowSelector()
  spyOn(windowSelector, 'registerWindow')
  spyOn(windowSelector, 'reset')
  spyOn(windowSelector, 'resetSelection')
  return windowSelector
}

module.exports = { create }
