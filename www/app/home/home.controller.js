(function () {
'use strict';

angular
  .module('app')
  .controller('HomeController', HomeController);

HomeController.$inject = ['AuthService', '$window'];

function HomeController (AuthService, $window)
{
  var vm = this;
  
  activate();

  function activate () {
    
  }
}


})();