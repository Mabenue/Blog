'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.contact',
  'myApp.about',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]).
controller('LandingCtrl', function($scope){
  $scope.banner = 'resources/banner.jpg';
  $scope.textBackground = 'resources/zwartevilt.png';
  $scope.background = 'resources/footer_lodyas.png';
});
