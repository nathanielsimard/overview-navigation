/* eslint-disable camelcase */
/* global spyOn */
class Actor {
  add_actor (actor) {}
}

function create () {
  const actor = new Actor()
  spyOn(actor, 'add_actor')
  return actor
}

module.exports = { create }
