'use strict';
module.exports = function(app) {
  var starDragons = require('../controllers/starDragonController');

  app.route('/stardragon/list')
    .get(starDragons.list)

  app.route('/stardragon/create')
    .post(starDragons.create)

  // app.route('/stardragon/:id')
  //   .get(stardragons.read_a_task)
  //   .put(stardragons.update_a_task)
  //   .delete(stardragons.delete_a_task);
};
