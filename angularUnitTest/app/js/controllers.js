'use strict';

/* Controllers */
/*module*/
var unitTestApp = angular.module('unitTestApp', []);

/* Controllers */
unitTestApp.controller('unitTestCtrl', function($scope,$http) {
  
    //set name 
    $scope.name = "william wood";
    
    //通过http请求得到user
    $scope.GetUser = function(){
        $http.get('/auth.py').then(function(response) {
        $scope.user = response.data;
    });
  };
});


