/* global angular */

(ng =>{

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	ng.module('app').directive('appReviewItem', () => ({

		restrict: 'A',
		scope: {
			'review': '=appReviewItem'
		},
		templateUrl: '/templates/_reviewItem.html'

	}));

})(angular);