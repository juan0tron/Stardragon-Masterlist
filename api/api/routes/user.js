const router = require('express').Router();
const User   = require('./../models/user');
const userController = require('./../controllers/user');
const authController = require('./../controllers/auth');

// Routes for /users
router.route('/')
  .post(userController.create)
  .get(userController.list)

// Routes for /users/:user_id
router.route('/:user_id')
  .get(userController.get)
  .put(userController.update)
  .delete(userController.delete)

module.exports = router;
