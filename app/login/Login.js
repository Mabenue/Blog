/**
 * Created by alexconway on 28/07/15.
 */
'use strict';

angular.module('myApp.login', ['ngRoute'])
    .controller('LoginCtrl', ['$scope', '$http', '$location' , function ($scope, $http, $location) {
        $scope.loginData = {};
        $scope.loginData.username = "";
        $scope.loginData.password = "";

        $scope.login = function () {
            $http.post('/api/login', this.loginData).success(function (){
                $location.path('/');
            }).error(function(){
                $location.path('/singup');
            })
        }
    }]);