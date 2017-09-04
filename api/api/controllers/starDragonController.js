'use strict';

var mongoose   = require('mongoose'),
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
  new_dragon.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
}

// exports.details

// exports.update

// exports.remove
