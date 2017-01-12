/* global angular */

(function(ng) {

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	ng.module('app').directive('appReviewGraph', function() {

		return {

			restrict: 'A',
			scope: {
				'ratings': '=appReviewGraph'
			},
			templateUrl: '/templates/_reviewGraph.html'

		}

	});

})(angular);