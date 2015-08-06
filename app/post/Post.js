/**
 * Created by alexconway on 31/07/15.
 */
'use strict';

angular.module('myApp.post', ['ngRoute'])
    .controller('PostCtrl', ['$scope', '$http', 'Upload', '$timeout', function ($scope, $http, Upload, $timeout) {
        $scope.$watch('files', function () {
           $scope.upload($scope.files);
        });

        $scope.upload = function (files){
            if(files){
                for (var i = 0; i < files.length; i++){
                    var file = files[i];
                    console.log(file);
                    Upload.upload({
                      url: '/api/attachment',
                      fields: {},
                      file: file
                    }).success(function(){
                      alert("files submitted");
                    })
                }
            }
        };

        $scope.newPost = function () {
            $http.post('/api/posts', this.postData).success(function (data){
                alert("Post Submitted");
                $scope.posts.push(data);
            })
        }
    }]);