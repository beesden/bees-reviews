/* global angular */

(ng => {

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	ng.module('app').directive('appProductItem', () => ({

		restrict: 'A',
		scope: {
			'product': '=appProductItem'
		},
		templateUrl: '/templates/_productItem.html'

	}));

})(angular);