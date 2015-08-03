/**
 * Created by alexconway on 31/07/15.
 */
'use strict';

angular.module('myApp.post', ['ngRoute'])
    .controller('PostCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.newPost = function () {
            $http.post('/api/posts', this.postData).success(function (data){
                alert("Post Submitted");
                $scope.posts.push(data);
            })
        }
    }]);