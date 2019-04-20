/* global describe */
/* global beforeEach */
/* global it */
/* global expect */

require('./helpers/core')
const { WindowSelector } = require('../src/windowSelector')
const { TestLogger } = require('../src/utils')

describe('WindowSelector', () => {
  const UKNOWN_KEY_SYMBOL = 'x076'
  const KNOWM_KEY_SYMBOL = 'x056'
  const OTHER_KNOWM_KEY_SYMBOL = 'x057'
  const KEY = 'a'
  const OTHER_KEY = 'b'

  let keySymbols
  let logger
  let windowSelector
  let window

  beforeEach(() => {
    window = {}
    keySymbols = {}
    keySymbols[KNOWM_KEY_SYMBOL] = KEY
    keySymbols[OTHER_KNOWM_KEY_SYMBOL] = OTHER_KEY
    logger = new TestLogger('Window Selector Test', true)
    windowSelector = new WindowSelector(keySymbols, logger)
  })

  describe('when select', () => {
    let selectedWindow

    describe('With one registered window', () => {
      let windowFocusedTag

      beforeEach(() => {
        windowSelector.registerWindow(window, tag => (windowFocusedTag = tag))
      })

      it('tag should be first key symbol', () => {
        expect(windowFocusedTag).toBe(KEY)
      })

      it('should has a tag of length of one', () => {
        expect(windowFocusedTag.length).toBe(1)
      })

      describe('With a knowm key symbol', () => {
        beforeEach(() => {
          selectedWindow = windowSelector.select(KNOWM_KEY_SYMBOL)
        })

        it('Should return selected window', () => {
          expect(selectedWindow).toBeDefined()
        })
      })

      describe('With a an unknown key symbol', () => {
        beforeEach(() => {
          selectedWindow = windowSelector.select(UKNOWN_KEY_SYMBOL)
        })

        it('should not return any window', () => {
          expect(selectedWindow).toBeUndefined()
        })
      })
    })

    describe('With multiple registered window', () => {
      let firstTag
      let secondTag
      let thirdTag

      beforeEach(() => {
        windowSelector.registerWindow(window, tag => (firstTag = tag))
        windowSelector.registerWindow({}, tag => (secondTag = tag))
        windowSelector.registerWindow({}, tag => (thirdTag = tag))
      })

      it('first tag should be two times first symbol', () => {
        expect(firstTag).toBe(KEY + KEY)
        expect(secondTag).toBe(KEY + OTHER_KEY)
        expect(thirdTag).toBe(OTHER_KEY + KEY)
      })

      it('should has a tag of length of two', () => {
        expect(firstTag.length).toBe(2)
        expect(secondTag.length).toBe(2)
        expect(thirdTag.length).toBe(2)
      })

      describe('With a knowm key symbol', () => {
        beforeEach(() => {
          selectedWindow = windowSelector.select(KNOWM_KEY_SYMBOL)
        })

        describe('another time', () => {
          beforeEach(() => {
            selectedWindow = windowSelector.select(KNOWM_KEY_SYMBOL)
          })

          it('Should return selected window', () => {
            expect(selectedWindow).toBeDefined()
          })
        })

        it('should not return any window', () => {
          expect(selectedWindow).toBeUndefined()
        })
      })
    })
  })
})
