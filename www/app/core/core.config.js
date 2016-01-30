(function () {
'use strict';

var config = {
    appErrorPrefix: '[FitVolley Error] ',
    appTitle: 'FitVolley',
};

angular
  .module('app.core')
  .value('config', config)
  .config(toastrConfig)
  .config(configure);


toastrConfig.$inject = ['toastr'];
function toastrConfig(toastr) {
    toastr.options.timeOut = 5000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.closeButton = true;
}


configure.$inject = [
  '$logProvider', 
  'routerHelperProvider', 
  'exceptionHandlerProvider', 
  '$httpProvider',
  'localStorageServiceProvider',
  'Environment'
];
function configure($logProvider, routerHelperProvider, 
                  exceptionHandlerProvider, $httpProvider,
                  localStorageServiceProvider, Environment) 
{
  if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
  }
  exceptionHandlerProvider.configure(config.appErrorPrefix);
  routerHelperProvider.configure({docTitle: ""});//config.appTitle + ': '});

  $httpProvider.interceptors.push("loggerHttpInterceptorService");
  $httpProvider.interceptors.push("coreHttpInterceptorService");

  var prefix = "fitvolley";
  if (Environment.env !== 'prod') {
    prefix += "-" + Environment.env;
  }
  localStorageServiceProvider.setPrefix(prefix);
}

})();