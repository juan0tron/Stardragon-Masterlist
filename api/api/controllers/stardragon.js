'use strict';

var mongoose   = require('mongoose'),
    ObjectId   = mongoose.Types.ObjectId,
    StarDragon = mongoose.model('StarDragons');

exports.list = function(req, res) {
  StarDragon.find({}, function(err, stardragons) {
    if (err)
      res.send(err);
    res.json(stardragons);
  });
};

exports.create = function(req, res) {
  var new_dragon = new StarDragon(req.body);
  new_dragon.save(function(err, dragon) {
    if (err)
      res.send(err);
    res.json(dragon);
  });
}

exports.details = function(req, res) {
  var stardragon_id = new ObjectId(req.body.id)
  StarDragon.findById(stardragon_id, function(err, dragon){
    if(err)
      res.send(err);
    res.json(dragon);
  })

}

// exports.update

// exports.remove
