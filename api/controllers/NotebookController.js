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
  findByTitle: function (req, res) {
    sails.log.debug("*******************/notebook/findByTitle");
    Notebook.findByTitle(req.body.title)
      .populate('todos')
      .exec(function (err, notebook) {
      if (err)
        res.status(500).json(err.Errors);
      if (notebook) {
        sails.log.debug("Notebook loaded from title");
        res.json(notebook)
      }
      else {
        res.status(500).json({ message: 'No notebook found' });
      }
    });
  }
};

