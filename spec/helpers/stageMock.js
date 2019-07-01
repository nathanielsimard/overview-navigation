/* global spyOn */
class Stage {
  connect (name, callback) {}
  disconnect (callback) {}
}

function create () {
  const stage = new Stage()
  spyOn(stage, 'connect')
  spyOn(stage, 'disconnect')
  return stage
}

module.exports = { create }
