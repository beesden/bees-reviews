/* global angular */

{

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	angular.module('app').directive('appReviewGraph', () => ({

		restrict: 'A',
		scope: {
			'appRatings': '=appReviewGraph'
		},
		templateUrl: '/templates/_reviewGraph.html',

		link: scope => {
			scope.$watch('appRatings', ratings => {

				if (!ratings) {
					return;
				}

				scope.total = ratings.TotalReviewCount;
				scope.ratings = {};

				ratings.RatingDistribution.forEach(ratings => {
					scope.ratings[ratings.RatingValue] = ratings.Count;
				})

			})
		}

	}));

}