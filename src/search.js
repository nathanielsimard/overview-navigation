var Search = class Search {
  constructor (overview, logger) {
    this.overview = overview
    this.logger = logger
    this.originalSearch = this.overview._overview._controls.viewSelector.startSearch
    this.originalOnTextChanged = this.overview._overview._controls.viewSelector._onTextChanged
    this._windows = []
  }

  disable () {
    this.logger.info('Disabling search ...')

    this.overview._overview._controls.viewSelector.startSearch = function (event) {}
    this.overview._overview._controls.viewSelector._onTextChanged = function (se, prop) {}

    this._windows.forEach(w => w._onDelete())
  }

  enable () {
    this.logger.debug('Enabling search ...')

    this.overview._overview._controls.viewSelector.startSearch = this.originalSearch
    this.overview._overview._controls.viewSelector._onTextChanged = this.originalOnTextChanged
  }
}

module.exports = { Search }
