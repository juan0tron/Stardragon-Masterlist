/**
  This file starts the Gem Echange API
*/
var mongo_url = 'mongodb://localhost:27017/devDB',
    ui_url    = 'http://localhost:4200',
    express   = require('express'),
    cors = require('cors'),
    app  = express(),
    port = process.env.PORT || 3000,
    mongoose   = require('mongoose'),
    StarDragon = require('./api/models/starDragonModel'), //created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(mongo_url, {useMongoClient:true});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({origin: ui_url}));

var routes = require('./api/routes/starDragonRoutes');
routes(app); //register the route

app.listen(port);

console.log('Gem Exchange API server started on port ' + port);
