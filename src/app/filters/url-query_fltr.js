/* global angular */
(ng => {

	/**
	 * @ngdoc filter
	 * @name app:urlQuery
	 *
	 * @description - Create url query parameters on the current URL
	 */
	ng.module('app').filter('urlQuery', ($httpParamSerializer, $location) => params => {

		let url = $location.path();
		let serializedParams = $httpParamSerializer(params);

		if (serializedParams.length > 0) {
			url += `?${serializedParams}`;
		}

		return url.indexOf('/') === 0 ? url.slice(1) : url;
	});

})(angular);