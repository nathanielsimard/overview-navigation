var Search = class Search {
  constructor (overview, logger) {
    this.overview = overview
    this.logger = logger
    this.originalSearch = this.overview._overview._controls._searchController.startSearch
    this.originalOnTextChanged = this.overview._overview._controls._searchController._onTextChanged
  }

  disable () {
    this.logger.info('Disabling search ...')

    this.overview._overview._controls._searchController.startSearch = function (event) {}
    this.overview._overview._controls._searchController._onTextChanged = function (se, prop) {}
  }

  enable () {
    this.logger.debug('Enabling search ...')

    this.overview._overview._controls._searchController.startSearch = this.originalSearch
    this.overview._overview._controls._searchController._onTextChanged = this.originalOnTextChanged
  }
}

module.exports = { Search }
