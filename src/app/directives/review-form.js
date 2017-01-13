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

				scope.form = {
					title: 'This is a test review',
					author: "Test User",
					comment: "This summer was one of MYSH U's best as visiting students from universities across the country collaborated on an outdoor, contemporary rendition of Shakespeareӳ A Midsummer Nightӳ Dream. Poetry readings in garden settings, lectures at the museum, film screenings, and madrigal style dining are just a few of the summerӳ highlights.",
					email: "test@test.com"
				};

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