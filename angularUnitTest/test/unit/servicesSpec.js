'use strict';

/* jasmine specs for services go here */
  
describe('serviceTest', function() {
    
describe('Test GetUserNumberService', function() {

    //mock module 
    beforeEach(module('unitTestApp'));
    
    it('GetUserNumberService should return 2', 
        inject(function($injector) {

       //模拟返回数据   
        var valid_respond = '[{"customerId": "1","name": "benwei"},{"customerId": "2","name": "william"}]';
        var $httpBackend = $injector.get('$httpBackend');
        $httpBackend.whenGET('/auth.py').respond(valid_respond);
         
         // 通过injector得到service    
         var getUserNumberService = $injector.get('GetUserNumberService');          
         var promise = getUserNumberService;
         var userNum;
         promise.then(function(data){
             userNum = data;
         });
         
         //强迫httpBackend返回数据
         $httpBackend.flush();
        
        //通过injector得到$rootScope      
        var $rootScope = $injector.get('$rootScope');    
        //强迫传递到当前作用域
        $rootScope.$apply();     
        //测试判断userNum是否为2
        expect(userNum).toEqual(2);     
    }));

});
    

});
