/**
 * Created by alexconway on 28/07/15.
 */
'use strict';

angular.module('myApp.login', ['ngRoute'])
    .controller('LoginCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.loginData = {};
        $scope.loginData.username = "";
        $scope.loginData.password = "";

        $scope.login = function () {
            $http.post('/api/login', this.loginData).success(function (){
                alert("Logged in Successfully");
            })
        }
    }]);