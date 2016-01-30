(function () {
'use strict';

angular
    .module('app.auth')
    .factory('AuthService', AuthService);

AuthService.$inject = [
    '$rootScope',
    '$q',
    'logger',
    '$http',
    'coreHttpService',
    'localStorageService'
];

function AuthService ($rootScope, $q, logger, $http, coreHttpService, localStorageService) 
{

    var service = {
        isLoggedIn : isLoggedIn,
        login : login,
        logout : logout,
        register : register,
        getUser : getUser,
        getSessionToken : getSessionToken,
        broadcast: broadcast
    };

    return service;

    function isLoggedIn () {
        return !!service.getSessionToken();
    }

    function getUser () {
        return localStorageService.get('user');
    }

    function login () {
        //
    }

    function register () {
        //
    }

    function broadcast () {
        _broadcast();
    }

    function getSessionToken () {
        return localStorageService.get('session');
    }

    function logout () {
        //
    }

    function _setUser (user) {
        localStorageService.set('session', user.token);
        localStorageService.set('user', user.user);
    }

    function _broadcast() {
        var data = {
            'authenticated': service.isLoggedIn(),
            'sessionToken': service.getSessionToken()
        };

        $rootScope.$broadcast('authenticated', data);
    }
}

})();