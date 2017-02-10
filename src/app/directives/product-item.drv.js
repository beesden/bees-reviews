/* global angular */

{

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	angular.module('app').directive('appProductItem', () => ({

		restrict: 'A',
		scope: {
			'product': '=appProductItem'
		},
		templateUrl: '/templates/_productItem.html'

	}));

}