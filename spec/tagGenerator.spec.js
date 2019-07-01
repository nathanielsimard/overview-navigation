/* global describe */
/* global beforeEach */
/* global it */
/* global expect */
const { TagGenerator } = require('../src/tagGenerator')

const FIRST_KEY_VALUE = 'a'
const FIRST_KEY_SYMBOL = 'x01'

const SECOND_KEY_VALUE = 'b'
const SECOND_KEY_SYMBOL = 'x02'

const THIRD_KEY_VALUE = 'c'
const THIRD_KEY_SYMBOL = 'x03'

const KEY_SYMBOLS = {
  [FIRST_KEY_SYMBOL]: FIRST_KEY_VALUE,
  [SECOND_KEY_SYMBOL]: SECOND_KEY_VALUE,
  [THIRD_KEY_SYMBOL]: THIRD_KEY_VALUE
}

const NO_MAPPING = {
  0: 0,
  1: 1,
  2: 2
}

const VALUES = Object.values(KEY_SYMBOLS)
const NUMBER_OF_DIFFERENT_KEYS = [...new Set(VALUES)].length

const MAXIMUM_NUMBER_OF_DIFFERENT_TAGS =
  NUMBER_OF_DIFFERENT_KEYS * NUMBER_OF_DIFFERENT_KEYS + NUMBER_OF_DIFFERENT_KEYS

const generateAllTags = tagGenerator => {
  const tags = []
  for (let index = 0; index < MAXIMUM_NUMBER_OF_DIFFERENT_TAGS; index++) {
    tags.push(tagGenerator.generate(index))
  }
  return tags
}

describe('Tag Generator with 3 key symbols', () => {
  let tagGenerator

  beforeEach(() => {
    tagGenerator = new TagGenerator(KEY_SYMBOLS, NO_MAPPING)
  })

  describe('when generate', () => {
    it('first 3 tags must be of size 1', () => {
      const tags = generateAllTags(tagGenerator)

      for (let i = 0; i < 3; i++) {
        expect(tags[i].length).toBe(1)
      }
    })

    it('tags after the 3e must be of size 2', () => {
      const tags = generateAllTags(tagGenerator)

      for (let i = 3; i < MAXIMUM_NUMBER_OF_DIFFERENT_TAGS; i++) {
        expect(tags[i].length).toBe(2)
      }
    })

    it('should never return same value for different index', () => {
      const tags = generateAllTags(tagGenerator)

      const uniqueTags = [...new Set(tags)]
      expect(uniqueTags.length).toBe(MAXIMUM_NUMBER_OF_DIFFERENT_TAGS)
    })
  })
})
