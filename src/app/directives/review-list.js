/* global angular */

(function(ng) {

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	ng.module('app').directive('appReviewList', function() {

		return {

			restrict: 'A',
			scope: {
				'reviews': '=appReviewList'
			},
			templateUrl: '/templates/_reviewList.html'

		}

	});

})(angular);