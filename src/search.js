class Search {
  constructor (overview, logger) {
    this.overview = overview
    this.logger = logger
    this.originalSearch = this.overview._controls.viewSelector.startSearch
    this.originalOnTextChanged = this.overview._controls.viewSelector._onTextChanged
  }

  disable () {
    this.logger.info('Disabling search ...')

    this.overview._controls.viewSelector.startSearch = function (event) {}
    this.overview._controls.viewSelector._onTextChanged = function (se, prop) {}
  }

  enable () {
    this.logger.info('Enabling search ...')

    this.overview._controls.viewSelector.startSearch = this.originalSearch
    this.overview._controls.viewSelector._onTextChanged = this.originalOnTextChanged
  }
}

module.exports = { Search }
