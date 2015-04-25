/* global angular */

/**
 * @ngdoc overview
 * @name app.controller
 */
var appControllers = angular.module('app.controller', ['app.utils']);

/**
 * @ngdoc controller
 * @name app.controller:productList
 *
 * @description - Display a list of products.
 */
appControllers.controller('productList', function($scope, $rootScope, $routeParams, reviewsService, utils) {

	reviewsService.getProductListings($routeParams, function(response) {
		var content = utils.convertCategoryResponse(response, $routeParams.id);
		// Add variables to scope
		$rootScope.title = content.title;
		$scope.productList = content.productList;
		$scope.pageInfo = content.productList;
	});

});

/**
 * @ngdoc controller
 * @name app.controller:reviewList
 *
 * @description - Display a product containing a list of reviews.
 */
appControllers.controller('reviewList', function($scope, $rootScope, $routeParams, reviewsService, utils) {

	// Get product (with reviews)
	reviewsService.getProduct($routeParams, true, function(response) {
		var content = utils.convertProductResponse(response, $routeParams.id, true);
		$rootScope.title = content.title;
		$scope.pageInfo = content.pageInfo;
		$scope.product = content.product;
		$scope.reviews = content.reviews;
	});

})

/**
 * @ngdoc controller
 * @name app.controller:reviewWrite
 *
 * @description - Display a review form for a specific product.
 */
appControllers.controller('reviewWrite', function($scope, $rootScope, $routeParams, reviewsService, utils) {

	// Get product
	reviewsService.getProduct($routeParams, false, function(response) {
		var content = utils.convertProductResponse(response, $routeParams.id);
		$rootScope.title = 'Write review for ' + content.title;
		$scope.product = content.product;
	});

})

/**
 * @ngdoc controller
 * @name app.controller:submitReviewForm
 *
 * @description - Submit a review form
 */
appControllers.controller('submitReviewForm', function($scope, $location, reviewsService) {

	var reviewSubmit = function() {
		// Validate form
		if (!$scope.reviewForm || $scope.reviewForm.$invalid) {
			console.error("Form does not exist or does not validate");
			return;
		}

		// Validate product
		if (!$scope.product || !$scope.product.Id) {
			console.error("Unable to find a product object to review");
			return;
		}
		var productId = ($scope.product.Id);

		// Submit review
		$scope.submit = true;
		reviewsService.submitProductReview(productId, $scope.reviewForm, $scope.review, function(response) {
			if ($scope.review) {
				$location.path('/product/' + productId);
				return;
			}
			$scope.review = response.Review;
			$scope.review.AuthorId = $scope.param.author;
			$scope.review.delay = response.TypicalHoursToPost;
			$scope.submit = false;
		});
	}

	$scope.reviewSubmit = reviewSubmit;

});