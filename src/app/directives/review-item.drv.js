/* global angular */

{

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	angular.module('app').directive('appReviewItem', () => ({

		restrict: 'A',
		scope: {
			'review': '=appReviewItem'
		},
		templateUrl: '/templates/_reviewItem.html'

	}));

}