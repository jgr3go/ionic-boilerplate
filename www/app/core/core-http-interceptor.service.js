(function () {
'use strict';

angular
    .module('app.core')
    .factory('coreHttpInterceptorService', coreHttpInterceptorService);

coreHttpInterceptorService.$inject = [
    '$injector',  
];

function coreHttpInterceptorService ($injector, PlaceApi, coreHttpService) 
{
    var service = {
        request : request
    };

    return service;

    function request (config) {
        var authService = $injector.get('AuthService');
        var sessionToken = authService.getSessionToken();

        if (config.url) {
            config.headers['Authorization'] = "JWT " + sessionToken;
        }

        return config;
    }
}

})();