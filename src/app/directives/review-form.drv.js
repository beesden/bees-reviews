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

				scope.submit = function(form, review) {
					return reviewDataService.submitProductReview($route.current.params.product, form, review).then(function(response) {
						delete scope.error;
						delete scope.review;

						if (response.HasErrors) {
							scope.error = true;
						} else if (review) {
							scope.review = response.Review;
							scope.review.AuthorId = form.author;
							scope.review.delay = response.TypicalHoursToPost;
						} else {
							scope.success = true;
						}
					});
				};

			}

		}

	});

})(angular);