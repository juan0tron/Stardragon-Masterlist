var _       = require('lodash');
var discord = require('../config/discord');

function onError(err, req, res, next) {

  console.error('API ERROR:', req.method + ' ' + req.url + '\n' + err.message);
  discord.sendError(
    '```md\nAPI ERROR:\n------------------------\n' +
    '\n<CALL> * ' + req.method + ' ' + req.url + ' * ' +
    '\n<API_ENV> * ' + req.headers.host + ' * ' +
    '\n\n' + err.message + '' +
    '```'
  );

  next();
}

module.exports = { onError };
