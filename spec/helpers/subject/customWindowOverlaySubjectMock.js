/* global spyOn */
class CustomWindowOverlaySubjectMock {
  addWindow () {}
  removeWindow () {}
  getAllWindows () {}
  register () {}
  unRegister () {}
}

function create () {
  const mock = new CustomWindowOverlaySubjectMock()
  spyOn(mock, 'addWindow')
  spyOn(mock, 'removeWindow')
  spyOn(mock, 'getAllWindows')
  spyOn(mock, 'register')
  spyOn(mock, 'unRegister')
  return mock
}

module.exports = { create }
