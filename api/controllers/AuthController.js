/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  index: function(req, res) {
    res.view();
  },

	login: function(req, res) {
	  passport.authenticate('local', function(err, user, info){
	    if(err){
	      res.send({
	        message: info.message,
          user: user
        })
      }
      req.logIn(user, function(err){
        if(err){
          res.send(err);
        }
        else{
          res.view('notebook', {
            message: info.message,
            user: user
          })
        }
      })
    })(req, res); //TODO: Understand (req, res) at the end of a function
  },

  logout: function(req, res){
    req.logout();
    res.redirect('/');
  },

  facebook: function(req, res) {
    passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email'] }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          console.log(err);
          res.view('500');
          return;
        }
        res.redirect('/');
        return;
      });
    })(req, res);
  }
};

