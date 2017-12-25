const fs   = require('fs');
const path = require('path');

/**
 *  @description Get the locally stored base64 encryption_key and return as string
 */
module.exports = function () {
  let pwd = process.env.PWD || '.';
  let src = path.join(pwd,'/api/config/encryption_key.key');
  let key = fs.readFileSync(src);
  key = Buffer.from(key).toString('base64');
  return key;
}
