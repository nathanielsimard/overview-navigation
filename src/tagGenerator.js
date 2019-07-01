class TagGenerator {
  constructor (keySymbols, ordering = {}) {
    this.keySymbols = keySymbols
    this.ordering = ordering

    const values = Object.values(this.keySymbols)
    this.numberOfDifferentKeys = [...new Set(values)].length
    this.keys = Object.keys(keySymbols)

    this._validateOrdering()
  }

  generate (index) {
    const div = Math.floor(index / this.numberOfDifferentKeys)
    const mod = index % this.numberOfDifferentKeys

    if (div === 0) {
      return this._generateLetter(index)
    } else {
      const firstLetter = this._generateLetter(div - 1)
      const secondLetter = this._generateLetter(mod)

      return firstLetter + secondLetter
    }
  }

  isMaximumIndex (index) {
    return index === this.numberOfDifferentKeys
  }

  calculateTagLength (index) {
    if (Math.floor(index / (this.numberOfDifferentKeys + 1)) === 0) {
      return 1
    } else {
      return 2
    }
  }

  _generateLetter (index) {
    const orderedIndex = this.ordering[index] || index
    const key = this.keys[orderedIndex]

    return this.keySymbols[key]
  }

  _validateOrdering () {
    const orderingLength = Object.values(this.ordering).length
    if (orderingLength !== 0 && orderingLength !== this.numberOfDifferentKeys) {
      throw new Error(
        "Ordering doesn't have the same number of values as unique keys : " +
          `Keys : ${this.numberOfDifferentKeys} Ordering : ${orderingLength}`
      )
    }
  }
}

module.exports = { TagGenerator }
