/* global spyOn */
class ListenerMock {
  onWindowCreated () {}
  onWindowDeleted () {}
}

function create () {
  const mock = new ListenerMock()
  spyOn(mock, 'onWindowCreated')
  spyOn(mock, 'onWindowDeleted')
  return mock
}

module.exports = { create }
