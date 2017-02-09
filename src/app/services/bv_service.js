/* global angular */

((ng) => {


	/**
	 * @ngdoc service
	 * @name app:reviewDataService
	 *
	 * @description - Various service factory which communicate with the BazaarVoice API
	 */
	ng.module('app').service('bvService', function(loadingService, messageService, $http, $sce) {

		var config = {
			bv: {
				params: {
					passkey: '2cpdrhohmgmwfz8vqyo48f52g',
					apiversion: 5.4
				},
				url: '//stg.api.bazaarvoice.com'
			}
		};

		/**
		 * Lookup data from BazaarVoice
		 *
		 * @param path
		 * @param params
		 * @param method
		 */
		this.request = (path, params, method) => {

			// Build the default BV API url
			var url = `${config.bv.url}/data/${path}.json?`;
			params = ng.merge({}, params, config.bv.params);

			loadingService.start();

			// Return the function which can be extended with '.success() {}'
			return $http({
				method: method || 'JSONP',
				params: params,
				url: $sce.trustAsResourceUrl(url)
			}).then(response => response.data, response => {
				messageService.add('error', response);
			}).finally(() => {
				loadingService.finish();
			});
		};

		/**
		 * Build pagination parameters
		 *
		 * @param pageParams
		 * @param limit
		 * @returns {{offset: number, limit: (*|number)}}
		 */
		this.getPaginationParams = (pageParams, limit) => {
			var params = {
				offset: 0,
				limit: limit || 10
			};
			// Page parameter
			if (!isNaN(pageParams.page) && pageParams.page > 0) {
				params.offset = (pageParams.page - 1) * params.limit;
			}
			return params;
		};

	});

})(angular);