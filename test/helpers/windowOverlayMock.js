/* global spyOn */
class WindowOverlay {
  showTooltip () {}
  hideTooltip () {}
}

function create () {
  const windowOverlay = new WindowOverlay()
  spyOn(windowOverlay, 'showTooltip')
  spyOn(windowOverlay, 'hideTooltip')
  return windowOverlay
}

module.exports = { create }
