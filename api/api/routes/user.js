const router = require('express').Router();
const User   = require('./../models/user');

// Routes for /users
router.route('/')
  .post(function(req,res){
    var user = new User();
    user.name = req.body.name;

    user.save(function(err){
      if(err){
        res.send(err);
      }
      res.json({message:"User created!"})
    });
  })
  .get(function(req,res){
    User.find(function(err, users){
      if(err){
        res.send(err);
      }
      res.json(users)
    })
  })

// Routes for /users/:user_id
router.route('/:user_id')
  // Get user
  .get(function(req,res){
    User.findById(req.params.user_id, function(err, user){
      if(err){
        res.send(err)
      }
      res.json(user)
    })
  })
  // Update user
  .put(function(req,res){
    User.findById(req.params.user_id, function(err, user){
      if(err){
        res.send(err)
      }

      // Update fields
      user.name = req.body.name;

      // Save User
      user.save(function(err){
        if(err){
          res.send(err)
        }
        res.json({message:"User updated!"})
      })
    })
  })
  // Delete user
  .delete(function(req,res){
    User.remove({ _id: req.params.user_id }, function(err, user) {
      if (err){
        res.send(err);
      }
      res.json({ message: 'User deleted!' });
    });
  })

module.exports = router;
