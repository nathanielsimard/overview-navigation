/* global describe */
/* global beforeEach */
/* global it */
/* global expect */

require('./helpers/core')
const { WindowSelector } = require('../src/windowSelector')
const { TestLogger } = require('../src/utils')
const { Factory } = require('../src/selectedWindow')
const MODE = require('../src/mode')
const overviewMock = require('./helpers/overviewMock')

describe('WindowSelector', () => {
  const UNKNOWN_KEY_SYMBOL = 'x076'
  const KNOWN_KEY_SYMBOL = 'x056'
  const OTHER_KNOWN_KEY_SYMBOL = 'x057'
  const KEY = 'a'
  const OTHER_KEY = 'b'

  let focusKeySymbols
  let closeKeySymbols
  let logger
  let windowSelector
  let window
  let overview

  beforeEach(() => {
    overview = overviewMock.create()
    window = {}
    focusKeySymbols = {}
    focusKeySymbols[KNOWN_KEY_SYMBOL] = KEY
    focusKeySymbols[OTHER_KNOWN_KEY_SYMBOL] = OTHER_KEY
    closeKeySymbols = {}
    closeKeySymbols['A'] = 'A'
    closeKeySymbols['B'] = 'B'
    logger = new TestLogger('Window Selector Test', true)
    windowSelector = new WindowSelector(
      focusKeySymbols,
      closeKeySymbols,
      logger,
      overview,
      new Factory(),
      MODE
    )
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

      describe('With Closing Mode', () => {
        let mode

        beforeEach(() => {
          mode = MODE.Closing
        })

        describe('With a known key symbol', () => {
          beforeEach(() => {
            selectedWindow = windowSelector.select(KNOWN_KEY_SYMBOL, mode)
          })

          it('Should return closable window', () => {
            expect(selectedWindow.activate).toBe(selectedWindow.close)
          })
        })

        describe('With Focussing Mode', () => {
          let mode

          beforeEach(() => {
            mode = MODE.Focussing
          })

          describe('With a known key symbol', () => {
            beforeEach(() => {
              selectedWindow = windowSelector.select(KNOWN_KEY_SYMBOL, mode)
            })

            it('Should return focusable window ', () => {
              expect(selectedWindow.activate).toBe(selectedWindow.focus)
            })
          })
        })

        describe('With a an unknown key symbol', () => {
          beforeEach(() => {
            selectedWindow = windowSelector.select(UNKNOWN_KEY_SYMBOL)
          })

          it('should not return any window', () => {
            expect(selectedWindow).toBeUndefined()
          })
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

      describe('With a knowm key symbol', () => {
        beforeEach(() => {
          selectedWindow = windowSelector.select(KNOWN_KEY_SYMBOL)
        })

        describe('another time', () => {
          beforeEach(() => {
            selectedWindow = windowSelector.select(KNOWN_KEY_SYMBOL)
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
