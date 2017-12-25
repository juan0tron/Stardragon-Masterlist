const router         = require('express').Router();
const User           = require('./../models/user');
const authController = require('./../controllers/auth');

router.post('/login', (req, res, next) => {
  const email    = (typeof req.body.email    === 'string') ? req.body.email    : false;
  const password = (typeof req.body.password === 'string') ? req.body.password : false;

  if (!email || email.length < 3) {
    return next(new Error("Email is required."))
  }
  if (!password || password.length < 12) {
    return next(new Error("Password is required."))
  }

  authController.authenticate(email, password)
    .then((results) => {
      if (results.valid) {
        let response = {
          message: results.message
        }
        if (typeof results.data == 'object') {
          response = Object.assign(response, results.data);
        }
        res.status(200).json(response);
      }
      else {
        // Error?
        next(results);
      }
    })
    .catch((err) => {
      res.statusCode = err.status || 500;
      next(new Error(err));
    });
});

router.post('/register', (req, res, next) => {

});

router.get('/getsalt', (req, res, next) => {
  authController.getSalt()
    .then((salt) => {
      res.status(200).json({ message: 'Got salt value.', data: salt });
    })
    .catch((err) => {
      res.status(500).json({ message:"Failed to generate salt."});
    })
});

module.exports = router;
