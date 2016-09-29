/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {
  attributes: {

    firstName: 'STRING',
    lastName: 'STRING',
    age: {
      type: 'INTEGER',
      max: 150
    },
    birthDate: 'DATE',
    phoneNumber: {
      type: 'STRING',
      defaultsTo: '+336XXXXXXXX'
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true,
      unique: true
    },
    username: {
      type: 'STRING',
      unique: true,
      maxLength: 20,
      minLength: 5,
      required: true
    },
    notebooks: {
      collection: 'notebook',
      via: 'owner'
    }
  },

  beforeCreate: function (user, cb) {

    // Hash password
    bcrypt.hash(user.password, 10, function(err, hash) {
      if(err) return cb(err);
      user.password = hash;
      //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
      cb();
    });

  }
};


