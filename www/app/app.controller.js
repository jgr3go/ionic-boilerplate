(function () {
'use strict';

angular
  .module('app')
  .controller('AppController', AppController);

AppController.$inject = ['AuthService', '$window'];

function AppController (AuthService, $window)
{
  var vm = this;
  vm.isLoggedIn = isLoggedIn;
  vm.login = login;
  vm.logout = logout;

  activate();

  function activate () {
    
  }

  function isLoggedIn () {
    return AuthService.isLoggedIn();
  }

  function login() {
    AuthService.register()
      .then(function (user) {
        console.log("logged in", user);
      });
  }

  function logout() {
    AuthService.logout();
  }
}
})();