/* global describe */
/* global beforeEach */
/* global it */
/* global expect */

require('../helpers/core')
const { WindowSelector } = require('../../src/window/windowSelector')
const { TagGenerator } = require('../../src/tagGenerator')

const LoggerMock = require('../helpers/loggerMock')
const { Factory } = require('../../src/window/selectedWindow')
const { MODE } = require('../../src/mode')
const overviewMock = require('../helpers/overviewMock')

describe('WindowSelector', () => {
  const UNKNOWN_KEY_SYMBOL = 'x076'
  const KNOWN_KEY_SYMBOL = 'x056'
  const OTHER_KNOWN_KEY_SYMBOL = 'x057'
  const KEY = 'a'
  const OTHER_KEY = 'b'
  const KEYS = [KEY, OTHER_KEY]

  let keySymbols
  let logger
  let windowSelector
  let window
  let overview

  beforeEach(() => {
    overview = overviewMock.create()
    window = {}
    keySymbols = {}
    keySymbols[KNOWN_KEY_SYMBOL] = KEY
    keySymbols[OTHER_KNOWN_KEY_SYMBOL] = OTHER_KEY
    logger = LoggerMock.create()
    windowSelector = new WindowSelector(
      keySymbols,
      new TagGenerator(keySymbols),
      logger,
      overview,
      new Factory()
    )
  })

  describe('when select', () => {
    let selectedWindow

    describe('With one registered window', () => {
      let windowFocusedTag

      beforeEach(() => {
        windowSelector.registerWindow(window, tag => (windowFocusedTag = tag))
      })

      it('should callback with a generated tag', () => {
        expect(KEYS.includes(windowFocusedTag)).toBeTruthy()
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

    describe('With more windows registered than the number of different key symbols', () => {
      let firstTag
      let secondTag
      let thirdTag

      beforeEach(() => {
        windowSelector.registerWindow(window, tag => (firstTag = tag))
        windowSelector.registerWindow({}, tag => (secondTag = tag))
        windowSelector.registerWindow({}, tag => (thirdTag = tag))
      })

      it('Tags should have two key symbols', () => {
        expect(firstTag.length).toBe(2)
        expect(secondTag.length).toBe(2)
        expect(thirdTag.length).toBe(2)
      })

      describe('With a known key symbol', () => {
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

    describe('With same number of windows registered as the number of different keySymbols', () => {
      let firstTag
      let secondTag

      beforeEach(() => {
        windowSelector.registerWindow(window, tag => (firstTag = tag))
        windowSelector.registerWindow({}, tag => (secondTag = tag))
      })

      it('Tag should have one key symbol', () => {
        expect(firstTag.length).toBe(1)
        expect(secondTag.length).toBe(1)
      })

      describe('With a known key symbol', () => {
        beforeEach(() => {
          selectedWindow = windowSelector.select(KNOWN_KEY_SYMBOL)
        })

        it('should not return any window', () => {
          expect(selectedWindow).toBeDefined()
        })
      })
    })
  })
})
