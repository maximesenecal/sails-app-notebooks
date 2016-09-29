/**
 * Created by maximesenecal on 19/08/2016.
 */
'use strict';

angular.module("notebookApp", [])
  .controller("MainController", function ($scope, $http) {

      $scope.userid = null;
      $scope.notebooks = null;
      //TODO: refresh or call automatically to load new notebooks from database
      activate();

      function activate() {
        $http.get('/user/current').then(function(response) {
          $scope.userid = response.data;
          getUserNotebooks($scope.userid);
        });
      }

      /*
       * NOTEBOOKS
       */

      /*
       * Get Notebooks from User
       * Blueprint API populate where
       * GET /:model/:id/:association
       */
      function getUserNotebooks (user_id) {
        $http.get('/user/' + user_id + '/notebooks').then(function(response) {
          $scope.notebooks = response.data;
          console.log("Loading notebooks (User : " + user_id + ") from API !");
        });
      }

      $scope.addNotebook = function(){
        var notebook = {
          'title': "My new notebook",
          'owner': $scope.userid
        };
        $http.post('/notebook/create', notebook).then(function (res) {
          console.log("A notebook was added");
        });
        $scope.notebooks.unshift(notebook);
      };

      $scope.deleteNotebook = function(notebook, index){
        $http.delete('/notebook/'+notebook.id, notebook).then(function(res) {
          console.log("The notebook was correctly deleted");
        }, function(res) {
          console.log("An error occurred in removal");
        });
        $scope.notebooks.splice(index, 1);
      };

      $scope.saveNotebook = function(notebook){
        $http.put('/notebook/'+notebook.id, notebook).then(function(res) {
          console.log("The notebook was saved");
        }, function(res) {
          console.log("An error occurred during updating");
        });
      };

      /*
       * TODOS
       */

      /*
       * Get Notebooks from User
       * Blueprint API populate where
       * GET /:model/:id/:association
       */
      var todos = [];
      $scope.getNotebookTodos = function(notebook_id) {
        $http.get('/notebook/' + notebook_id + '/todos').then(function(response) {
          console.log("Loading todos (Notebook : " + notebook_id + ") from API !");
          todos = response.data;
          return todos;
        });
      };

      $scope.addTodo = function(notebook){
        var todo = {
          'title': "My new todo",
          'content': "Lorem ipsum",
          'owner': notebook.id
        };
        $http.post('/todo/create', todo).then(function (res) {
          console.log("A todo was added in the notebook " + notebook.id + "");
        });
      };

  });
