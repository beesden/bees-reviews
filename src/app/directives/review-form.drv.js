/* global angular */

(ng =>{

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	ng.module('app').directive('appReviewForm', ($route, reviewDataService) => ({

		restrict: 'A',
		templateUrl: '/templates/_reviewForm.html',

		link: scope => {

			scope.submit = (form, review) => reviewDataService.submitProductReview($route.current.params.product, form, review).then(response => {
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

		}

	}));

})(angular);