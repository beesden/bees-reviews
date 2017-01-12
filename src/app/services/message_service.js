/* global angular */

(function(ng) {

    /**
     * @ngdoc service
     * @name app:reviewDataService
     *
     * @description - Various services which communicate with the BazaarVoice API
     */
    ng.module('app').service('messageService', function($rootScope) {

        var _self = this;
        var messageQueue = [];

        _self.messages = [];

        /**
         * Clear all messages from the queue
         */
        _self.clear = function() {
            _self.messages.length = 0;
        };

        /**
         * Immediately publish a message
         *
         * @param level
         * @param message
         */
        _self.add = function(level, message) {
            _self.messages.unshift({
                level: level || 'info',
                text: message
            });
        };

        /**
         * Queue a message to be published on route change
         *
         * @param level
         * @param message
         */
        _self.queue = function(level, message) {
            messageQueue.push([level, message]);
        };

        // Publish messages on route change
        $rootScope.$on('$routeChangeSuccess', function() {
            _self.clear();
            for (var i = 0; i < messageQueue.length; i++) {
                _self.add(messageQueue[i]);
            }
            messageQueue = [];
        });

    });

})(angular);