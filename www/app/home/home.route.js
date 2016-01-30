(function () {
'use strict';

angular
  .module('app.home')
  .run(appRun);

appRun.$inject = ['routerHelper']

function appRun (routerHelper) {
  routerHelper.configureStates(getStates());
}

function getStates () {
  return [
    {
      state : "menu.home",
      config : {
        url : "^/home",
        views : {
          menuContent : {
            templateUrl : "app/home/home.html",
            controller : "HomeController as HomeCtrl"
          }
        },
        cache: true,
        menuState: true
      }
    }
  ];  
}


})();