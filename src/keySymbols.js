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

    this.closeKeySymbols = {}
    this.closeKeySymbols[keys.KEY_A] = 'A'
    this.closeKeySymbols[keys.KEY_B] = 'B'
    this.closeKeySymbols[keys.KEY_C] = 'C'
    this.closeKeySymbols[keys.KEY_D] = 'D'
    this.closeKeySymbols[keys.KEY_E] = 'E'
    this.closeKeySymbols[keys.KEY_F] = 'F'
    this.closeKeySymbols[keys.KEY_G] = 'G'
    this.closeKeySymbols[keys.KEY_H] = 'H'
    this.closeKeySymbols[keys.KEY_I] = 'I'
    this.closeKeySymbols[keys.KEY_J] = 'J'
    this.closeKeySymbols[keys.KEY_K] = 'K'
    this.closeKeySymbols[keys.KEY_L] = 'L'
    this.closeKeySymbols[keys.KEY_M] = 'M'
    this.closeKeySymbols[keys.KEY_N] = 'N'
    this.closeKeySymbols[keys.KEY_O] = 'O'
    this.closeKeySymbols[keys.KEY_P] = 'P'
    this.closeKeySymbols[keys.KEY_Q] = 'Q'
    this.closeKeySymbols[keys.KEY_R] = 'R'
    this.closeKeySymbols[keys.KEY_S] = 'S'
    this.closeKeySymbols[keys.KEY_T] = 'T'
    this.closeKeySymbols[keys.KEY_U] = 'U'
    this.closeKeySymbols[keys.KEY_V] = 'V'
    this.closeKeySymbols[keys.KEY_W] = 'W'
    this.closeKeySymbols[keys.KEY_X] = 'X'
    this.closeKeySymbols[keys.KEY_Y] = 'Y'
    this.closeKeySymbols[keys.KEY_Z] = 'Z'
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
