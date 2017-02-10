/* global angular */

{

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	angular.module('app').directive('appReviewSummary', () => ({

		restrict: 'A',
		scope: {
			'summary': '=appReviewSummary'
		},
		templateUrl: '/templates/_reviewSummary.html'

	}));

}