const router = require('express').Router();
const User   = require('./../models/user');
const authController = require('./../controllers/auth');

// Routes for /users
router.route('/')
  .post(function(req, res, next){
    // Look up if this user already exists
    User.findOne({email:req.body.email}, function(err, user){
      // If user exists, return error.
      if(user){
        return next({message:"User already exists.", status:400});
      }
      // If user does not exist, create a new one.
      else{
        var new_user  = new User();
            new_user.name     = req.body.name;
            new_user.email    = req.body.email;
            new_user.password = authController.encrypt(req.body.password);

        new_user.save(function(err){
          if(err){
            return next(err);
          }
          res.json({message:"User created!"})
        });
      }
    })

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
