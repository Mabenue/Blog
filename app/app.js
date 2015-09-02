'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngFileUpload',
    'myApp.home',
    'myApp.contact',
    'myApp.about',
    'myApp.login',
    'myApp.signup',
    'myApp.post'
]).
    config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/Home.html',
            controller: 'HomeCtrl'
        }).when('/signup', {
            templateUrl: 'partials/Signup.html',
            controller: 'SignupCtrl'
        }).when('/login', {
            templateUrl: 'partials/Login.html',
            controller: 'LoginCtrl'
        }).when('/post', {
            templateUrl: 'partials/Post.html',
            controller: 'PostCtrl'
        }).when('/contact', {
            templateUrl: 'partials/Contact.html',
            controller: 'ContactCtrl'
        }).when('/about', {
            templateUrl: 'partials/About.html',
            controller: 'AboutCtrl'
        }).otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }]).
    controller('LandingCtrl', ['$scope', function ($scope) {
        $scope.banner = 'img/hexaglogo.svg'
        $scope.textBackground = 'img/zwartevilt.png';
        $scope.background = 'img/footer_lodyas.png';
    }]);

