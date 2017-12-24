const router = require('express').Router();
const User   = require('./../models/user');

// Routes for /users
router.route('/')
  .post(function(req, res, next){
    var user  = new User();
    user.name = req.body.name;

    user.save(function(err){
      if(err){
        return next(err);
      }
      res.json({message:"User created!"})
    });
  })
  .get(function(req, res, next){
    User.find(function(err, users){
      if(err){
        return next(err);
      }

      res.json(users)
    })
  })

// Routes for /users/:user_id
router.route('/:user_id')
  // Get user
  .get(function(req, res, next){
    User.findById(req.params.user_id, function(err, user){
      if(err){
        return next(new Error('Error retrieving user '+req.params.user_id));
      }
      res.json(user)
    })
  })
  // Update user
  .put(function(req, res, next){
    User.findById(req.params.user_id, function(err, user){
      if(err){
        return next(new Error('Error saving changes to user '+req.params.user_id));
      }

      // Update fields
      user.name = req.body.name;

      // Save User
      user.save(function(err){
        if(err){
          return next(err);
        }
        res.json({message:"User updated!"})
      })
    })
  })
  // Delete user
  .delete(function(req, res, next){
    User.remove({ _id: req.params.user_id }, function(err, user) {
      if (err){
        return next(err);
      }
      res.json({ message: 'User deleted!' });
    });
  })

module.exports = router;
