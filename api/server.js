/**
 *  @description This file starts the Gem Echange API
 */
var mongo_url = 'mongodb://localhost:27017/devDB',
    ui_url    = 'http://localhost:4200',
    port      = process.env.PORT || 3000,

    // Express
    express    = require('express'),
    bodyParser = require('body-parser');
    app        = express();

    cors       = require('cors')


// Use Mongoose to connect API to MongoDB
const mongoose = require('mongoose');
      mongoose.Promise = global.Promise;
      mongoose.connect(mongo_url, {useMongoClient:true});

// Use bodyparser to let us read POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
const routes = require('./api/routes')
app.use('/', routes);

// START SERVER
app.listen(port);

console.log('Gem Exchange API server started on port ' + port);
