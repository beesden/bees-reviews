/* global angular */

{

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	angular.module('app').directive('appReviewList', () => ({

		restrict: 'A',
		scope: {
			'reviews': '=appReviewList'
		},
		templateUrl: '/templates/_reviewList.html'

	}));

}