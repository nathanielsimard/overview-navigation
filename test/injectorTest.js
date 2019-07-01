/* global beforeEach */
/* global beforeAll */
/* global it */
/* global expect */
/* global describe */
require('./helpers/core')

const loggerMock = require('./helpers/loggerMock')
const ii = require('../src/injector')

describe('Injector', () => {
  let aClassSameMethodNameCalled
  let anotherClassSameMethodNameCalled
  let anotherClassDifferentMethodNameCalled

  class AClass {
    constructor () {
      aClassSameMethodNameCalled = false
      anotherClassSameMethodNameCalled = false
      anotherClassDifferentMethodNameCalled = false
    }
    sameMethodName () {
      aClassSameMethodNameCalled = true
    }
  }

  class AnotherClass {
    sameMethodName () {
      anotherClassSameMethodNameCalled = true
    }
    differentMethodName () {
      anotherClassDifferentMethodNameCalled = true
    }
  }

  describe('given AClass injected into AnotherClass', () => {
    let injector

    beforeAll(() => {
      injector = new ii.Injector(loggerMock.create())
      injector.inject(AnotherClass, AClass, () => new AnotherClass())
    })

    describe('when call aClass.sameMethodName() while injector is enabled', () => {
      beforeEach(() => {
        injector.enable()
        const aClass = new AClass()
        aClass.sameMethodName()
      })

      it('then AClass.sameMethodName() is called', () => {
        expect(aClassSameMethodNameCalled).toBe(true)
      })

      it('then AnotherClass.sameMethodName() is not called', () => {
        expect(anotherClassSameMethodNameCalled).toBe(true)
      })
    })

    describe('when call aClass.differentMethodName() while injector is enabled', () => {
      beforeEach(() => {
        injector.enable()
        const aClass = new AClass()
        aClass.differentMethodName()
      })

      it('then AClass.differentMethodName() is called', () => {
        expect(anotherClassDifferentMethodNameCalled).toBe(true)
      })
    })

    describe('when call aClass.sameMethodName() while injector is disabled', () => {
      beforeEach(() => {
        injector.disable()
        const aClass = new AClass()
        aClass.sameMethodName()
      })

      it('then AClass.sameMethodName() is called', () => {
        expect(aClassSameMethodNameCalled).toBe(true)
      })

      it('then AnotherClass.sameMethodName() is not called', () => {
        expect(anotherClassSameMethodNameCalled).toBe(false)
      })
    })

    describe('when create aClass while injector is disabled', () => {
      let aClass

      beforeEach(() => {
        injector.disable()
        aClass = new AClass()
      })

      it('then AClass.differentMethodName() is undefined', () => {
        expect(aClass.differentMethodName).toBeUndefined()
      })
    })
  })
})
