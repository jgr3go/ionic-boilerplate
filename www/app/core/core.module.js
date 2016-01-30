(function () {
    'use strict';

    angular
        .module('app.core', [ 
          'blocks.logger', 
          'blocks.router',
          'blocks.exception',
          'LocalStorageModule',
          'ngCordova',
        ]);
})();