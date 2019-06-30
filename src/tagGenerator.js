class TagGenerator {
  constructor (keySymbols, logger) {
    this.keySymbols = keySymbols
    this.logger = logger

    const values = Object.values(this.keySymbols)
    this.numberOfDifferentKeys = [...new Set(values)].length
    this.keys = Object.keys(keySymbols)
  }

  generate (index) {
    const div = Math.floor(index / this.numberOfDifferentKeys)
    const mod = index % this.numberOfDifferentKeys

    if (div === 0) {
      const tag = `${this.keySymbols[this.keys[index]]}`

      this.logger.debug(`Generating tag : ${tag}`)
      return tag
    } else {
      this.logger.debug(`div: ${div - 1} mod: ${mod}`)
      return `${this.keySymbols[this.keys[div - 1]]}${
        this.keySymbols[this.keys[mod]]
      }`
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
}

module.exports = { TagGenerator }
