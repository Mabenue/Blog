/**
 * Created by alexconway on 31/07/15.
 */
'use strict';

angular.module('myApp.post', ['ngRoute'])
    .controller('PostCtrl', ['$scope', '$http', 'Upload', '$timeout', function ($scope, $http, Upload, $timeout) {
        $scope.$watch('files', function () {
           $scope.upload($scope.files);
        });

        $scope.postData = {};
        $scope.postData.paths = [];

        $scope.upload = function (files){
            if(files){
                for (var i = 0; i < files.length; i++){
                    var file = files[i];
                    console.log(file);
                    Upload.upload({
                      url: '/api/attachment',
                      fields: {},
                      file: file
                    }).success(function(data){
                        $scope.postData.paths = data;
                    })
                }
            }
        };

        $scope.newPost = function () {
            $http.post('/api/posts', this.postData).success(function (){
                alert("Post Submitted");
            })
        }
    }]);