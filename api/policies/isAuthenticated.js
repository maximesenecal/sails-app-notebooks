/**
 * Created by maximesenecal on 06/09/2016.
 */

module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else{
    return res.redirect('/login');
  }
};
