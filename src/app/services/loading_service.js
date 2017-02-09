/* global angular */

(ng => {

	/**
	 * @ngdoc service
	 * @name app:reviewDataService
	 *
	 * @description - Various services which communicate with the BazaarVoice API
	 */
	ng.module('app').service('loadingService', function() {

		let _self = this;

		let loadCount = 0;
		_self.loading = false;


		/**
		 * @ngdoc method
		 * @name start
		 * @methodOf app.reviewDataService
		 * @description Add a counter to the loader count
		 */
		_self.start = () => {
			loadCount++;
		};

		/**
		 * @ngdoc method
		 * @name finish
		 * @methodOf app.reviewDataService
		 * @description a counter from the loading service
		 */
		_self.finish = () => {
			loadCount = Math.max(0, loadCount - 1);
			_self.loading = loadCount > 0;
		};

	});

})(angular);