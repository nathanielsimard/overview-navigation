/* global spyOn */
class Logger {
  info (message) {}
  error (message) {}
  debug (message) {}
}

function create () {
  const logger = new Logger()
  spyOn(logger, 'info')
  spyOn(logger, 'error')
  spyOn(logger, 'debug')
  return logger
}

module.exports = { create }
