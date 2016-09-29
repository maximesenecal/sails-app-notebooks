/**
 * Created by maximesenecal on 06/09/2016.
 */

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt');

/*
 * Saved to session req.session.passport.user = {id:'..'}
 * http://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize#
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ id: id } , function (err, user) {
    done(err, user);
  });
});

/*
 * Using LocalStrategy for a basic authentication with email and password
 */
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {

    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      bcrypt.compare(password, user.password, function (err, res) {
        if (!res)
          return done(null, false, {
            message: 'Invalid Password'
          });
        var returnUser = {
          email: user.email,
          createdAt: user.createdAt,
          id: user.id
        };
        return done(null, returnUser, {
          message: 'Logged In Successfully'
        });
      });
    });
  }
));
