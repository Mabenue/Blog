/**
 * Created by alexconway on 28/07/15.
 */
'use strict';

angular.module('myApp.signup', ['ngRoute'])
    .controller('SignupCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.signupModel = {};
        $scope.signupModel.username = "";
        $scope.signupModel.password = "";
        $scope.signupModel.verify = "";


        $scope.signup = function () {
            $http.post('/api/signup', this.signupModel).success(function () {
                alert("Signed Up!");
            })
        }

    }]);