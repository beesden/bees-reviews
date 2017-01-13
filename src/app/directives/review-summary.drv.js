/* global angular */

(function(ng) {

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	ng.module('app').directive('appReviewSummary', function() {

		return {

			restrict: 'A',
			scope: {
				'summary': '=appReviewSummary'
			},
			templateUrl: '/templates/_reviewSummary.html'

		}

	});

})(angular);