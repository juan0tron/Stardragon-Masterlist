/**
 *  @description This file starts the Gem Echange API
 */
var mongo_url = 'mongodb://localhost:27017/devDB',
    ui_url    = 'http://localhost:4200',
    port      = process.env.PORT || 3000,

    cors       = require('cors'),

    // Express
    express    = require('express'),
    bodyParser = require('body-parser'),
    app        = express()

// Use Mongoose to connect API to MongoDB
const mongoose = require('mongoose');
      mongoose.Promise = global.Promise;
      mongoose.connect(mongo_url, {useMongoClient:true});

// Use bodyparser to let us read POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set headers
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', 'localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE');
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Headers', 'Content-Type, auth-token, accept, Access-Control-Allow-Headers, Authorization, X-Requested-With');
});

// ROUTES
const routes = require('./api/routes')
app.use('/', routes);

// Handle Errors
const errorHandler = require('./api/middleware/errorHandler');
app.use(errorHandler.onError);

// Discord Bot for error logging
discord = require('./api/config/discord')
discord.initBot();

// START SERVER
app.listen(port);

console.log('Gem Exchange API server started on port ' + port);
