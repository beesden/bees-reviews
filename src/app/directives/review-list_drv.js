/* global angular */

(ng =>{

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	ng.module('app').directive('appReviewList', () => ({

		restrict: 'A',
		scope: {
			'reviews': '=appReviewList'
		},
		templateUrl: '/templates/_reviewList.html'

	}));

})(angular);