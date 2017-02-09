/* global angular */

(ng =>{

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	ng.module('app').directive('appReviewSummary', () => ({

		restrict: 'A',
		scope: {
			'summary': '=appReviewSummary'
		},
		templateUrl: '/templates/_reviewSummary.html'

	}));

})(angular);