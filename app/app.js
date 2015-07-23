'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.contact',
  'myApp.about'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]).
controller('LandingCtrl', ['$scope', function($scope){
  $scope.banner = 'img/banner.jpg';
  $scope.textBackground = 'img/zwartevilt.png';
  $scope.background = 'img/footer_lodyas.png';
}]);

