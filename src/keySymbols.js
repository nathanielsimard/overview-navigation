class KeysSymbols {
  constructor (keys) {
    this.ignoredKeySymbols = {}
    this.ignoredKeySymbols[keys.KEY_j] = 'j'
    this.ignoredKeySymbols[keys.KEY_k] = 'k'

    this.keySymbols = {}
    this.keySymbols[keys.KEY_a] = 'a'
    this.keySymbols[keys.KEY_b] = 'b'
    this.keySymbols[keys.KEY_c] = 'c'
    this.keySymbols[keys.KEY_d] = 'd'
    this.keySymbols[keys.KEY_e] = 'e'
    this.keySymbols[keys.KEY_f] = 'f'
    this.keySymbols[keys.KEY_g] = 'g'
    this.keySymbols[keys.KEY_h] = 'h'
    this.keySymbols[keys.KEY_i] = 'i'
    this.keySymbols[keys.KEY_j] = 'j'
    this.keySymbols[keys.KEY_k] = 'k'
    this.keySymbols[keys.KEY_l] = 'l'
    this.keySymbols[keys.KEY_m] = 'm'
    this.keySymbols[keys.KEY_n] = 'n'
    this.keySymbols[keys.KEY_o] = 'o'
    this.keySymbols[keys.KEY_p] = 'p'
    this.keySymbols[keys.KEY_q] = 'q'
    this.keySymbols[keys.KEY_r] = 'r'
    this.keySymbols[keys.KEY_s] = 's'
    this.keySymbols[keys.KEY_t] = 't'
    this.keySymbols[keys.KEY_u] = 'u'
    this.keySymbols[keys.KEY_v] = 'v'
    this.keySymbols[keys.KEY_w] = 'w'
    this.keySymbols[keys.KEY_x] = 'x'
    this.keySymbols[keys.KEY_y] = 'y'
    this.keySymbols[keys.KEY_z] = 'z'
    this._removeIngoreKeys()
  }

  _removeIngoreKeys () {
    const keys = Object.keys(this.ignoredKeySymbols)
    for (let i = 0; i < keys.length; i++) {
      delete this.keySymbols[keys[i]]
    }
  }
}

if (!global.overviewNavigationTesting) {
  /* global imports */
  const Clutter = imports.gi.Clutter

  /*eslint-disable */
  function initialize() {
    /* eslint-enable */
    return new KeysSymbols(Clutter)
  }
}
