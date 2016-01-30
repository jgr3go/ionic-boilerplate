(function() {
'use strict';

angular
    .module('blocks.logger')
    .factory('loggerHttpInterceptorService', loggerHttpInterceptorService);

loggerHttpInterceptorService.$inject = ['$injector', '$q', 'logger', 'toastr'];

function loggerHttpInterceptorService($injector, $q, logger, toastr) {
    var service = {
        responseError: responseError,
    };
    return service;

    ///////////////

    function responseError(error) {
        console.log("responseError::", error);
        logger.log("loggerHttpInterceptor::", error);

        //This code is if we ever need to discern between response types
        var user_errors = [400];
        if (user_errors.indexOf(error.status) != -1) {
            angular.forEach(error.data, function (message, field) {
                if (angular.isArray(message)) {
                    angular.forEach(message, function (innerMessage) {
                        logger.warning(field + ": " + innerMessage);
                        toastr.error(innerMessage);
                    });
                } else {
                    logger.warning(field + ": " + message);
                    toastr.error(message);
                }
            });
        }

        var forbidden_errors = [403];
        if (forbidden_errors.indexOf(error.status) != -1) {
            var $state = $injector.get('$state');
            $state.go("menu.403", {}, {location: "replace"});
        }

        if (error.status === 500) {
            toastr.error("Uh oh! Something went wrong :(");
        }

        if (error.status === 0) {
            toastr.error("We are unable to find a data connection.");
        }

        return $q.reject(error);
    }
}

})();
