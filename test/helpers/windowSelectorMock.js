/* global spyOn */
class WindowSelector {
  registerWindow (metaWindow, callback) {}
  reset () {}
  resetSelection () {}
  select (keySymbol) {}
}

function create () {
  const windowSelector = new WindowSelector()
  spyOn(windowSelector, 'registerWindow')
  spyOn(windowSelector, 'reset')
  spyOn(windowSelector, 'resetSelection')
  spyOn(windowSelector, 'select')
  return windowSelector
}

module.exports = { create }
