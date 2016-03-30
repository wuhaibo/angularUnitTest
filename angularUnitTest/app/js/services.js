'use strict';

/* Services */
unitTestApp.factory('GetUserNumberService',    
    function($http,$q) {
       var deferred = $q.defer();
       
       //http 服务请求
       $http({method: 'GET', url: '/auth.py'}).then(
           function(response){
              deferred.resolve(response.data.length); 
           },
           function (response) {
              deferred.reject(response); 
           }
       );
       
       //返回http 服务请求的promise
       return deferred.promise;  
    }
);