const router  = require('express').Router();

// Middleware for all requests
router.use(function(req, res, next){
  console.log(req.method + ": " + req.originalUrl);
  next();
});

// Test route
router.get('/', function(req, res){
  res.status(200).json({message:"API Works Bitch"})
});

// Include other routers
// const auth        = require('./auth');
// const stardragons = require('./stardragon');
const users       = require('./user');

// router.use('/auth', auth);
// router.use('/stardragon', stardragons);
router.use('/users', users);


module.exports = router;
