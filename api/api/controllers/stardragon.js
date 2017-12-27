var mongoose   = require('mongoose'),
    ObjectId   = mongoose.Types.ObjectId,
    StarDragon = mongoose.model('Stardragon');

/**
 *  @description List all Stardragons
 */
exports.list = function(req, res, next) {
  StarDragon.find({}, function(err, stardragons, next) {
    if (err)
      next(err);
    res.json(stardragons);
  });
}

/**
 *  @description Create a Stardragon
 */
exports.create = function(req, res, next) {
  var new_dragon = new StarDragon(req.body);
  new_dragon.save(function(err, dragon, next) {
    if (err)
      next(err);
    res.json(dragon);
  });
}

/**
 *  @description Get a specific Stardragon
 */
exports.details = function(req, res,next) {
  var stardragon_id = new ObjectId(req.body.id)
  StarDragon.findById(stardragon_id, function(err, dragon, next){
    if(err)
      next(err);
    res.json(dragon);
  })
}
