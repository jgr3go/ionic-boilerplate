(function() {
  'use strict';

  angular
    .module('app.core')
    .run(appRun);

  appRun.$inject = ['routerHelper', '$rootScope', '$state'];

  function appRun (routerHelper, $rootScope, $state) {

    var otherwise = '/';
    routerHelper.configureStates(getStates(), otherwise);

    $rootScope.$on("$stateChangeStart", stateChangeStart);

    function stateChangeStart (event, toState, toParams, fromState, fromParams) {
      if (toState.name == "root") {
        event.preventDefault();

        $state.go("menu.home");
      }
    }

  }

  function getStates() {
    return [
      {
        state : "root",
        config : {
          url : "/"
        }
      },
      {
        state: 'menu',
        config: {
          url: '/',
          abstract : true,
          templateUrl: 'app/layout/menu.html',
          controller : "AppController as AppCtrl",
          cache: false
        }
      }, 
      {
        state: 'menu.403',
        config: {
          url: '403',
          templateUrl: 'app/layout/403.html',
          cache: true
        }
      }
    ];
  }
})();