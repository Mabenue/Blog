/**
 * Created by alexconway on 28/07/15.
 */
'use strict';

angular.module('myApp.signup', ['ngRoute'])
    .controller('SignupCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.signupData = null;
        $scope.signup = function () {
            $http.post('/api/signup', this.signupData).success(function (data){
                alert("Signed Up!");
            })
        }
    }]);