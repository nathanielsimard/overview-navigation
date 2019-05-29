/* global spyOn */
class CustomWindowOverlaysMock {
  onWindowCreated () {}
  onWindowDeleted () {}
  getAllWindows () {}
  register () {}
  unRegister () {}
}

function create () {
  const mock = new CustomWindowOverlaysMock()
  spyOn(mock, 'onWindowCreated')
  spyOn(mock, 'onWindowDeleted')
  spyOn(mock, 'getAllWindows')
  spyOn(mock, 'register')
  spyOn(mock, 'unRegister')
  return mock
}

module.exports = { create }
