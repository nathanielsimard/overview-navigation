/* global spyOn */
class SelectedWindow {
  activate () {}
}

function create () {
  const selectedWindow = new SelectedWindow()
  spyOn(selectedWindow, 'activate')
  return selectedWindow
}

module.exports = { create }
