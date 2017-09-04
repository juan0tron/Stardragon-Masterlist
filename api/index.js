/**
  This file starts the Gem Echange API
*/
var express = require('express'),
    app  = express(),
    port = process.env.PORT || 3000,
    mongoose   = require('mongoose'),
    StarDragon = require('./api/models/starDragonModel'), //created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/devDB', {useMongoClient:true});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/starDragonRoutes');
routes(app); //register the route

app.listen(port);

console.log('RESTful API server started on port ' + port);
