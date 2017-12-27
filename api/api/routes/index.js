const router  = require('express').Router();

// Middleware for all requests
router.use(function(req, res, next){
  // Log all calls
  console.log(req.method + ": " + req.originalUrl);

  // Set response headers
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE');
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Headers', 'Content-Type, auth-token, accept, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  next();
});

// Test route
router.get('/', function(req, res){
  res.status(200).json({message:"API Works Bitch"})
});

// Include other routers
const auth        = require('./auth');
const stardragons = require('./stardragon');
const users       = require('./user');

// Use routers
router.use('/auth',        auth);
router.use('/stardragons', stardragons);
router.use('/users',       users);

module.exports = router;
