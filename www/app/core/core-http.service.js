(function () {
'use strict';

angular
    .module('app.core')
    .factory('coreHttpService', coreHttpService);

coreHttpService.$inject = [];

function coreHttpService () {
    var service = {
        unwrapSuccess: unwrapSuccess,
        appendQuery: appendQuery,
        flattenParameters: flattenParameters
    };
    return service;

    function unwrapSuccess (response) {
        return response.data;
    }

    function appendQuery (baseUri, parameters) {
        var result = baseUri;
        if (result.indexOf('?') < 0) {
            result = result + "?";
        } else {
            result = result + "&";
        }
        result += service.flattenParameters(parameters);
        return result;
    }

    function flattenParameters (parameters) {
        if (!parameters) {
            return "";
        }
        var denormed = [];
        angular.forEach(parameters, function (param, key) {
            if (param !== undefined) {
                denormed.push(encodeURIComponent(key) + "=" + encodeURIComponent(param));
            }
        });
        return denormed.join("&");
    }

}

    
})();
