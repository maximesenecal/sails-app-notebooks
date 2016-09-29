/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `UserController.findByPseudo()`
   */
  findByPseudo: function (req, res) {
    sails.log.debug("******************* /findByPseudo");
    User.findOneByPseudo(req.body.pseudo).exec(function (err, user) {
      if (err)
        res.status(500).json({error: 'Error'});
      if (user) {
        res.json(user)
      }
      else {
        res.status(500).json({message: 'User not found'});
      }
    });
  },

  current: function(req, res){
    sails.log.debug("*******************/user/current");
    if(req.user) {
      res.json(req.user.id)
    }
    else {
      res.json({message: 'No login user'});
    }
  }
};

