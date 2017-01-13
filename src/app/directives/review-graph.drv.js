/* global angular */

(function(ng) {

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	ng.module('app').directive('appReviewGraph', function() {

		return {

			restrict: 'A',
			scope: {
				'appRatings': '=appReviewGraph'
			},
			templateUrl: '/templates/_reviewGraph.html',

			link: function(scope) {
				scope.$watch('appRatings', function(ratings) {

					if (!ratings) {
						return;
					}

					scope.total = ratings.TotalReviewCount;
					scope.ratings = {};

					ratings.RatingDistribution.forEach(function(ratings) {
						scope.ratings[ratings.RatingValue] = ratings.Count;
					})

				})
			}

		}

	});

})(angular);