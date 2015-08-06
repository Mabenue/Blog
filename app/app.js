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
            templateUrl: 'home/Home.html',
            controller: 'HomeCtrl'
        }).when('/signup', {
            templateUrl: 'signup/Signup.html',
            controller: 'SignupCtrl'
        }).when('/login', {
            templateUrl: 'login/Login.html',
            controller: 'LoginCtrl'
        }).when('/post', {
            templateUrl: 'post/Post.html',
            controller: 'PostCtrl'
        }).when('/contact', {
            templateUrl: 'contact/Contact.html',
            controller: 'ContactCtrl'
        }).when('/about', {
            templateUrl: 'about/About.html',
            controller: 'AboutCtrl'
        }).otherwise({redirectTo: '/home'});
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }]).
    controller('LandingCtrl', ['$scope', function ($scope) {
        $scope.banner = 'img/banner.jpg';
        $scope.textBackground = 'img/zwartevilt.png';
        $scope.background = 'img/footer_lodyas.png';
    }]);

