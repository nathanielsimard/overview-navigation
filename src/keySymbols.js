const Clutter = require('gi/Clutter')

const LOWER_CASE_KEY_SYMBOLS = {
  [Clutter.KEY_a]: 'a',
  [Clutter.KEY_b]: 'b',
  [Clutter.KEY_c]: 'c',
  [Clutter.KEY_d]: 'd',
  [Clutter.KEY_e]: 'e',
  [Clutter.KEY_f]: 'f',
  [Clutter.KEY_g]: 'g',
  [Clutter.KEY_h]: 'h',
  [Clutter.KEY_i]: 'i',
  [Clutter.KEY_j]: 'j',
  [Clutter.KEY_k]: 'k',
  [Clutter.KEY_l]: 'l',
  [Clutter.KEY_m]: 'm',
  [Clutter.KEY_n]: 'n',
  [Clutter.KEY_o]: 'o',
  [Clutter.KEY_p]: 'p',
  [Clutter.KEY_q]: 'q',
  [Clutter.KEY_r]: 'r',
  [Clutter.KEY_s]: 's',
  [Clutter.KEY_t]: 't',
  [Clutter.KEY_u]: 'u',
  [Clutter.KEY_v]: 'v',
  [Clutter.KEY_w]: 'w',
  [Clutter.KEY_x]: 'x',
  [Clutter.KEY_y]: 'y',
  [Clutter.KEY_z]: 'z'
}

const UPPER_CASE_KEY_SYMBOLS = {
  [Clutter.KEY_A]: 'a',
  [Clutter.KEY_B]: 'b',
  [Clutter.KEY_C]: 'c',
  [Clutter.KEY_D]: 'd',
  [Clutter.KEY_E]: 'e',
  [Clutter.KEY_F]: 'f',
  [Clutter.KEY_G]: 'g',
  [Clutter.KEY_H]: 'h',
  [Clutter.KEY_I]: 'i',
  [Clutter.KEY_J]: 'j',
  [Clutter.KEY_K]: 'k',
  [Clutter.KEY_L]: 'l',
  [Clutter.KEY_M]: 'm',
  [Clutter.KEY_N]: 'n',
  [Clutter.KEY_O]: 'o',
  [Clutter.KEY_P]: 'p',
  [Clutter.KEY_Q]: 'q',
  [Clutter.KEY_R]: 'r',
  [Clutter.KEY_S]: 's',
  [Clutter.KEY_T]: 't',
  [Clutter.KEY_U]: 'u',
  [Clutter.KEY_V]: 'v',
  [Clutter.KEY_W]: 'w',
  [Clutter.KEY_X]: 'x',
  [Clutter.KEY_Y]: 'y',
  [Clutter.KEY_Z]: 'z'
}

const NATURAL_ORDERING = {
  0: 0,
  1: 18,
  2: 3,
  3: 5,
  4: 6,
  5: 16,
  6: 22,
  7: 4,
  8: 17,
  9: 19,
  10: 25,
  11: 23,
  12: 2,
  13: 21,
  14: 1,
  15: 24,
  16: 7,
  17: 13,
  18: 20,
  19: 9,
  20: 12,
  21: 8,
  22: 10,
  23: 11,
  24: 14,
  25: 15
}

module.exports = {
  LOWER_CASE_KEY_SYMBOLS,
  UPPER_CASE_KEY_SYMBOLS,
  NATURAL_ORDERING
}
