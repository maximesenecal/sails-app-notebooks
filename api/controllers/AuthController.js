/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

  _config : {
    deepBluePrint : true
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
  }
};

