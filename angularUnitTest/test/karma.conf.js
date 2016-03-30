module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      //
	  'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      
      //test framework
	  'app/bower_components/karma-read-json/karma-read-json.js',
      'app/bower_components/jasmine-jquery/lib/jasmine-jquery.js',
	  
      //src and test file 
      'app/js/**/*.js',
      'test/unit/**/*.js',
	  
      // fixtures
      {pattern: 'test/mock/*.json',  included: false},
	  {pattern: 'test/mock/*.html',  included: false}
    ],

    autoWatch : true,

    frameworks: ['jasmine','jquery-1.8.3'],

    browsers : ['Chrome'/*, 'Firefox'*/],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
			'karma-jquery'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
	 singleRun: false

  });
};