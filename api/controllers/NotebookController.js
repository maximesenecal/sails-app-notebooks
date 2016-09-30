/**
 * NotebookController
 *
 * @description :: Server-side logic for managing Notebooks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * @description NotebookController.findByNotebook()
   * @type {Object}
   */
  index: function(req, res) {
    res.view({
      user: req.user
    });
  }
};

