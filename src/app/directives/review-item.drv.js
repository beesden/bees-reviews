/* global angular */

(function(ng) {

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	ng.module('app').directive('appReviewItem', function() {

		return {

			restrict: 'A',
			scope: {
				'review': '=appReviewItem'
			},
			templateUrl: '/templates/_reviewItem.html'

		}

	});

})(angular);