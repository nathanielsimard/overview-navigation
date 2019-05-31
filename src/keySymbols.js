class KeysSymbols {
  constructor (keys) {
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

    this.keySymbols[keys.KEY_A] = 'a'
    this.keySymbols[keys.KEY_B] = 'b'
    this.keySymbols[keys.KEY_C] = 'c'
    this.keySymbols[keys.KEY_D] = 'd'
    this.keySymbols[keys.KEY_E] = 'e'
    this.keySymbols[keys.KEY_F] = 'f'
    this.keySymbols[keys.KEY_G] = 'g'
    this.keySymbols[keys.KEY_H] = 'h'
    this.keySymbols[keys.KEY_I] = 'i'
    this.keySymbols[keys.KEY_J] = 'j'
    this.keySymbols[keys.KEY_K] = 'k'
    this.keySymbols[keys.KEY_L] = 'l'
    this.keySymbols[keys.KEY_M] = 'm'
    this.keySymbols[keys.KEY_N] = 'n'
    this.keySymbols[keys.KEY_O] = 'o'
    this.keySymbols[keys.KEY_P] = 'p'
    this.keySymbols[keys.KEY_Q] = 'q'
    this.keySymbols[keys.KEY_R] = 'r'
    this.keySymbols[keys.KEY_S] = 's'
    this.keySymbols[keys.KEY_T] = 't'
    this.keySymbols[keys.KEY_U] = 'u'
    this.keySymbols[keys.KEY_V] = 'v'
    this.keySymbols[keys.KEY_W] = 'w'
    this.keySymbols[keys.KEY_X] = 'x'
    this.keySymbols[keys.KEY_Y] = 'y'
    this.keySymbols[keys.KEY_Z] = 'z'
  }
}

if (!global.overviewNavigationTesting) {
  const Clutter = require('gi/Clutter')

  /*eslint-disable */
  function initialize() {
    /* eslint-enable */
    return new KeysSymbols(Clutter)
  }
}
