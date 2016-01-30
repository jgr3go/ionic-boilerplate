(function() {
    'use strict';

    angular
        .module('blocks.logger')
        .factory('logger', logger);

    logger.$inject = ['$log', 'toastr'];

    /* @ngInject */
    function logger($log, toastr, loggerDataService) {
        var service = {
            showToasts: true,

            error   : error,
            info    : info,
            success : success,
            warning : warning,

            // straight to console; bypass toastr
            log     : log
        };

        return service;
        /////////////////////

        function error(args) {
            args = detect.apply(this, arguments);
            // toastr.error(args.message, args.title);
            $log.error('Error: ' + args.message, args.data);
            //loggerDataService.logError(args.message, args.data);
        }

        function info(args) {
            args = detect.apply(this, arguments);
            // toastr.info(args.message, args.title);
            $log.info('Info: ' + args.message, args.data);
        }

        function success(args) {
            args = detect.apply(this, arguments);
            // toastr.success(args.message, args.title);
            $log.info('Success: ' + args.message, args.data);
        }

        function warning(args) {
            args = detect.apply(this, arguments);
            // toastr.warning(args.message, args.title);
            $log.warn('Warning: ' + args.message, args.data);
        }

        function log(args) {
            args = detect.apply(this, arguments);
            $log.log("Log: " + args.message, args.data);
        }

        function detect() {
            var eMsg = {
                message : "",
                data : "",
                title : ""
            };

            if (arguments.length === 3) {
                eMsg.message = arguments[0];
                eMsg.data = arguments[1];
                eMsg.title = arguments[2];
            }
            else if (arguments.length === 2) {
                eMsg.message = arguments[0];
                eMsg.data = arguments[1];
            } else {
                var obj = arguments[0];
                if (angular.isString(obj)) {
                    eMsg.message += obj;
                } else if (angular.isObject(obj)) {
                    if (obj.hasOwnProperty('message')) {
                        eMsg.message += obj.message;
                    }
                    if (obj.hasOwnProperty('code')) {
                        eMsg.message += ", code:" + obj.code;
                    }
                    if (obj.hasOwnProperty('data')) {
                        eMsg.data += obj.data;
                    }
                }
            }

            return eMsg;
        }
    }
}());