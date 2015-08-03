'use strict';

angular.module('myApp.home', ['ngRoute'])
    .controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
        $http.get('/api/posts').success(function (data) {
            $scope.posts = data;
        }).error(function () {
            $scope.error = 'An error occurred loading posts'
        });

        $http.get('/api/loggedin').success(function (data) {
            $scope.loggedUser = data;
        }).error(function () {
            $scope.error = 'An error occurred loading posts'
        });
    }]);