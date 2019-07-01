/* global spyOn */
class Overview {
  show () {}
}

function create () {
  const overview = new Overview()
  spyOn(overview, 'show')
  return overview
}

module.exports = { create }
