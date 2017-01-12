/* global angular */

(function(ng) {

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	ng.module('app').directive('appReviewForm', function($route, reviewDataService) {

		return {

			restrict: 'A',
			templateUrl: '/templates/_reviewForm.html',

			link: function(scope) {

				scope.submit = function(form) {
					return reviewDataService.submitProductReview($route.current.params.product, form).then(function(response) {
						scope.review = response.Review;
						scope.review.AuthorId = form.author;
						scope.review.delay = response.TypicalHoursToPost;
					});
				};

			}

		}

	});

})(angular);