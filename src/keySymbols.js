class KeysSymbols {
  constructor (keys) {
    this.focusKeySymbols = {}
    this.focusKeySymbols[keys.KEY_a] = 'a'
    this.focusKeySymbols[keys.KEY_b] = 'b'
    this.focusKeySymbols[keys.KEY_c] = 'c'
    this.focusKeySymbols[keys.KEY_d] = 'd'
    this.focusKeySymbols[keys.KEY_e] = 'e'
    this.focusKeySymbols[keys.KEY_f] = 'f'
    this.focusKeySymbols[keys.KEY_g] = 'g'
    this.focusKeySymbols[keys.KEY_h] = 'h'
    this.focusKeySymbols[keys.KEY_i] = 'i'
    this.focusKeySymbols[keys.KEY_j] = 'j'
    this.focusKeySymbols[keys.KEY_k] = 'k'
    this.focusKeySymbols[keys.KEY_l] = 'l'
    this.focusKeySymbols[keys.KEY_m] = 'm'
    this.focusKeySymbols[keys.KEY_n] = 'n'
    this.focusKeySymbols[keys.KEY_o] = 'o'
    this.focusKeySymbols[keys.KEY_p] = 'p'
    this.focusKeySymbols[keys.KEY_q] = 'q'
    this.focusKeySymbols[keys.KEY_r] = 'r'
    this.focusKeySymbols[keys.KEY_s] = 's'
    this.focusKeySymbols[keys.KEY_t] = 't'
    this.focusKeySymbols[keys.KEY_u] = 'u'
    this.focusKeySymbols[keys.KEY_v] = 'v'
    this.focusKeySymbols[keys.KEY_w] = 'w'
    this.focusKeySymbols[keys.KEY_x] = 'x'
    this.focusKeySymbols[keys.KEY_y] = 'y'
    this.focusKeySymbols[keys.KEY_z] = 'z'

    this.focusKeySymbols[keys.KEY_A] = 'a'
    this.focusKeySymbols[keys.KEY_B] = 'b'
    this.focusKeySymbols[keys.KEY_C] = 'c'
    this.focusKeySymbols[keys.KEY_D] = 'd'
    this.focusKeySymbols[keys.KEY_E] = 'e'
    this.focusKeySymbols[keys.KEY_F] = 'f'
    this.focusKeySymbols[keys.KEY_G] = 'g'
    this.focusKeySymbols[keys.KEY_H] = 'h'
    this.focusKeySymbols[keys.KEY_I] = 'i'
    this.focusKeySymbols[keys.KEY_J] = 'j'
    this.focusKeySymbols[keys.KEY_K] = 'k'
    this.focusKeySymbols[keys.KEY_L] = 'l'
    this.focusKeySymbols[keys.KEY_M] = 'm'
    this.focusKeySymbols[keys.KEY_N] = 'n'
    this.focusKeySymbols[keys.KEY_O] = 'o'
    this.focusKeySymbols[keys.KEY_P] = 'p'
    this.focusKeySymbols[keys.KEY_Q] = 'q'
    this.focusKeySymbols[keys.KEY_R] = 'r'
    this.focusKeySymbols[keys.KEY_S] = 's'
    this.focusKeySymbols[keys.KEY_T] = 't'
    this.focusKeySymbols[keys.KEY_U] = 'u'
    this.focusKeySymbols[keys.KEY_V] = 'v'
    this.focusKeySymbols[keys.KEY_W] = 'w'
    this.focusKeySymbols[keys.KEY_X] = 'x'
    this.focusKeySymbols[keys.KEY_Y] = 'y'
    this.focusKeySymbols[keys.KEY_Z] = 'z'
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
