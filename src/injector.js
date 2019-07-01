class Inject {
  constructor (parent, name, func) {
    this.name = name
    this.func = func
    this.parent = parent
    this.origin = this.parent[name]
  }

  enable () {
    if (this.origin === undefined) {
      this._injectNewFunc()
    } else {
      this._injectExistingFunc(this.func, this.origin)
    }
  }

  _injectNewFunc () {
    this.parent[this.name] = this.func
  }

  _injectExistingFunc (func, origin) {
    this.parent[this.name] = function () {
      const originRet = origin.apply(this, arguments)
      const newRet = func.apply(this, arguments)

      if (originRet === undefined) {
        return newRet
      }

      return originRet
    }
  }

  disable () {
    this.parent[this.name] = this.origin
  }
}

class Injector {
  constructor (logger) {
    this.logger = logger
    this.injected = []
  }

  inject (classToInjecte, classToBeInjected, factoryFunction) {
    const methodsToInject = this._findMethods(classToInjecte)
    const logger = this.logger

    logger.debug(`Injecting class ${classToInjecte.name}`)
    logger.debug(`Injecting ${methodsToInject}`)

    const injected = methodsToInject.map(method => {
      return new Inject(classToBeInjected.prototype, method, function () {
        if (!this[classToInjecte.name]) {
          this[classToInjecte.name] = factoryFunction(this)
        }

        this[classToInjecte.name][method](arguments)
      })
    })

    this.injected.push(...injected)
  }

  enable () {
    this.injected.forEach(i => i.enable())
  }

  disable () {
    this.injected.forEach(i => i.disable())
  }

  _findMethods (object) {
    return Object.getOwnPropertyNames(object.prototype)
      .filter(property => typeof object.prototype[property] === 'function')
      .filter(methodName => methodName !== 'constructor')
  }
}

module.exports = { Injector }
