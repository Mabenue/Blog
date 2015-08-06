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


'use strict';

angular.module('myApp.about', ['ngRoute'])
    .controller('AboutCtrl', [function () {

    }]);
'use strict';

angular.module('myApp.contact', ['ngRoute'])
    .controller('ContactCtrl', [function () {

    }]);
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