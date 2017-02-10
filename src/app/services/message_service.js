/* global angular */

{

	/**
	 * @ngdoc service
	 * @name app:reviewDataService
	 *
	 * @description - Various services which communicate with the BazaarVoice API
	 */
	angular.module('app').service('messageService', function($rootScope) {

		const _self = this;
		const messageQueue = [];

		_self.messages = [];

		/**
		 * Clear all messages from the queue
		 */
		_self.clear = () => {
			_self.messages.length = 0;
		};

		/**
		 * Immediately publish a message
		 *
		 * @param level
		 * @param message
		 */
		_self.add = (level = 'info', message) => {
			_self.messages.unshift({
				level: level,
				text: message
			});
		};

		/**
		 * Queue a message to be published on route change
		 *
		 * @param level
		 * @param message
		 */
		_self.queue = (level, message) => {
			messageQueue.push({level, message});
		};

		// Publish messages on route change
		$rootScope.$on('$routeChangeSuccess', () => {
			_self.clear();
			messageQueue.forEach(message => _self.add(message.level, message.message));
			messageQueue.length = 0;
		});

	});

}