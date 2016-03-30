'use strict';
 
//测试类型描述，这里表示测试unitTestApp的controllers
describe('unitTestApp controllers', function() {
 
  //测试类型描述，这里表示测试unitTestCtrl这个controller
  describe('unitTestCtrl', function(){
      
    //beforeEach 表示在运行所有测试前的准备工作。
    //这里生成unitTestApp 的module
    beforeEach(module('unitTestApp'));
    
    //定义在测试中会用到的object,以便在整个测试环境中使用
    var scope,ctrl;

        //inject利用angular的依赖注入，将需要的模块,服务插入作用域
    beforeEach(inject(function ($controller, $rootScope) {
        //模拟生成scope, $rootScope是angular中的顶级scope，angular中每个controller中的     
        //scope都是rootScope new出来的
        scope = $rootScope.$new();
        //模拟生成controller 并把先前生成的scope传入以方便测试
        ctrl = $controller('unitTestCtrl', {$scope: scope});
    }));
        
    //测试从这里开始
    // it 里'should create name william wood in unitTestCtrl' 说明测试的项目
    it('should create name william wood in unitTestCtrl', 
       inject(function() {
        //测试期望 scope.name 的值为 william wood  
        expect(scope.name).toEqual('william wood');
    }));
 
     //模拟http get的返回值, 插入injector服务，让我们能够在测试代码中使用依赖注入来获得需要的服务
	it('GetUser should fetch users', inject(function($injector){
        // $httpBackend 是由angular mock提供的一个模拟http请求返回服务
        // 可以用它来模拟http请求的返回值
        // 这里通过$injector来获取它的实例        
        var $httpBackend = $injector.get('$httpBackend');
        
        // $httpBackend 在Get方法，对 '/auth.py' 的url将会返回 一个jason对象
        // {customerId: '1',name:'benwei'} 
		$httpBackend.when('GET', '/auth.py').respond({customerId: '1',name:'benwei'});
		
        //以上为测试前的准备工作, 也可以把这部分代码放在beforeEach里，
        //但要注意： beforeEach里的设置将影响所有在它作用域的测试用例。
        
        
        //运行GetUser函数        
        scope.GetUser();
        
        //把http的异步转为同步，要求$httpBackend立刻返回数据 
		$httpBackend.flush();
        
        // 查看scope.user的值是否正确
		expect(scope.user).toEqual({customerId: '1',name:'benwei'});
    }));
    
  
    
      it('GetUser should fetch users mock response from file', 
        inject(function($injector){
            
        //从文件中读取模拟返回数据    
        var valid_respond = readJSON('test/mock/data.json');        
 
        // 这里通过$injector来获取它的实例获取 httpBackend服务的实例    
        var $httpBackend = $injector.get('$httpBackend');
        
        // $httpBackend 在Get方法，对 '/auth.py' 的url将会返回 
        // 一个从test/mock/data.json读取的json对象
		$httpBackend.when('GET', '/auth.py').respond(valid_respond);
               
         // $httpBackend 在Get方法，对 '/auth.py' 的url将会返回 一个jason对象
        // {customerId: '1',name:'benwei'} 
		$httpBackend.when('GET', '/auth.py').respond({customerId: '1',name:'benwei'});
		
        //运行GetUser函数        
        scope.GetUser();
        
        //把http的异步转为同步，要求$httpBackend立刻返回数据 
		$httpBackend.flush();
        
        // 查看scope.user的值是否正确
        expect(scope.user.length).toBe(2);       
    }));
  });
});
 

