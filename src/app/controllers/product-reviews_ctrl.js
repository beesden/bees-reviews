/* global angular */

(function(ng) {

    /**
     * @ngdoc controller
     * @name app:reviewWrite
     *
     * @description - Display a review form for a specific product.
     */
    ng.module('app').controller('reviewWrite', function($scope, $rootScope, $routeParams, reviewsService, utils) {

        // Get product
        reviewsService.getProduct($routeParams, false, function(response) {
            var content = utils.convertProductResponse(response, $routeParams.id);
            $rootScope.title = 'Write review for ' + content.title;
            $scope.product = content.product;
        });

    // }).config(function($routeProvider) {
    //
    //     $routeProvider.when('/review/:id?', {
    //         controller: 'ProductListController',
    //         resolve: {
    //             productList: function($routeParams, reviewsService) {
    //                 reviewsService.getProductListings($routeParams, function(response) {
    //                     return utils.convertCategoryResponse(response, $routeParams.id);
    //                 });
    //             }
    //         },
    //         templateUrl: 'productList.html'
    //     })

    });

    /**
     * @ngdoc controller
     * @name app:submitReviewForm
     *
     * @description - Submit a review form
     */
    ng.module('app').controller('submitReviewForm', function($scope, $location, reviewsService) {

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
        };

        $scope.reviewSubmit = reviewSubmit;

    });

})(angular);