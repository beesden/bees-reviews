/* global angular */

(function(ng) {

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	ng.module('app').directive('appProductItem', function() {

		return {

			restrict: 'A',
			scope: {
				'product': '=appProductItem'
			},
			templateUrl: '/templates/_productItem.html'

		}

	});

})(angular);