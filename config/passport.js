/**
 * Created by maximesenecal on 06/09/2016.
 */

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
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

passport.use('facebook', new FacebookStrategy({
    clientID        : '1175140152530100',
    clientSecret    : 'e63a5cfd6c7e92beffce86a87c289676',
    callbackURL     : '/login/facebook/callback',
    profileFields: ['id', 'email']
  },

  // facebook will send back the tokens and profile
  function(access_token, refresh_token, profile, done) {
    process.nextTick(function() {

      // find the user in the database based on their email or facebook or facebook id
      User.findOne({ $or: [ {'email' : profile.emails[0].value }, {'facebook.id' : profile.id }] }, function(err, user) {

        if (err)
          return done(err);
        // if the user is found, then log them in
        if (user) {
          return done(null, user); // user found, return that user
        } else {
          // if there is no user
          var newUser = new User();

          // set all of the facebook information in our user model
          newUser.facebook.id    = profile.id;
          newUser.facebook.access_token = access_token;
          newUser.facebook.firstName  = profile.name.givenName;
          newUser.facebook.lastName = profile.name.familyName;
          newUser.facebook.email = profile.emails[0].value;

          // save our user to the database
          newUser.save(function(err) {
            if (err)
              throw err;

            // if successful, return the new user
            return done(null, newUser);
          });
        }
      });
    });
  }));
