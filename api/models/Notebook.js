/**
 * Notebook.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: 'STRING',
    /*
     * One to many reference
     * One notebook can have many todos
     */
    todos: {
      collection: 'todo',
      via: 'owner'
    },
    owner: {
      model: 'user'
    }
  }
};

