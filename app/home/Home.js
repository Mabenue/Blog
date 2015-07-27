'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/Home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('/posts').success(function (data){
    $scope.posts = data;
  }).error(function() {
    $scope.error = 'An error occurred loading posts'
  });
}]);