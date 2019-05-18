/* global spyOn */
class WindowOverlay {
  showTooltip () {}
  hideTooltip () {}
  showTooltipClosing () {}
  hideTooltipClosing () {}
}

function create () {
  const windowOverlay = new WindowOverlay()
  spyOn(windowOverlay, 'showTooltip')
  spyOn(windowOverlay, 'hideTooltip')
  spyOn(windowOverlay, 'showTooltipClosing')
  spyOn(windowOverlay, 'hideTooltipClosing')
  return windowOverlay
}

module.exports = { create }
