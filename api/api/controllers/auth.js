const btoa           = require('btoa');
const sha256         = require('fast-sha256');
const crypto         = require('crypto');
const encryption_key = require('../config/getkey')();
const algorithm      = 'aes-256-ctr';

const mongoose = require('mongoose');

const User = require('./../models/user');

/**
 *  @function authenticate
 *  @description
 *  @param {string} email
 *  @param {string} password
 */
exports.authenticate = function(email, password){
  return new Promise((resolve, reject) => {
    User.findOne({email:email},function(err, user){
      // No user with that email exists
      if(!user){
        return resolve({
          valid:     false,
          status:    400,
          message:   'Invalid email.',
          retryable: true,
        })
      }
      // User found, check password
      else{
        if(password == decrypt(user.password)){
          return resolve({
            valid:   true,
            message: 'Login success!',
          })
        }
        else{
          return resolve({
            valid:     false,
            status:    400,
            message:   'Invalid password.',
            retryable: true,
          })
        }
      }
    })
  });
}

/**
 *  @function encrypt
 *  @description Encrypt a string. Called before Insert
 *  @param  {string} text The string being encrypted.
 *  @return {string}      The encrypted value.
 */
exports.encrypt = function(text){
  const cipher = crypto.createCipher(algorithm, encryption_key)
  let crypted  = cipher.update(text, 'utf8', 'hex')
      crypted += cipher.final('hex');
  return crypted;
}

/**
 *  @function decrypt
 *  @description Decrypt a string. Called before matching password.
 *  @param  {string} text The string being decrypted.
 *  @return {string}      The decrypted value.
 */
function decrypt(text){
  const decipher = crypto.createDecipher(algorithm, encryption_key)
  let dec  = decipher.update(text, 'hex', 'utf8')
      dec += decipher.final('utf8');
  return dec;
}

/**
 *  @function hash
 *  @description Hash a string (SHA256). For creating user passwords server-side.
 *  @param  {string} text The string being hashed.
 *  @return {string}      The hash.
 */
exports.hash = function(text){
  var pw_hash = sha256(text);
  return btoa(String.fromCharCode.apply(null, pw_hash));
}
