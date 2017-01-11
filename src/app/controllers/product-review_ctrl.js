/* global angular */

(function(ng) {

    /**
     * @ngdoc controller
     * @name app:reviewList
     *
     * @description - Display a product containing a list of reviews.
     */
    ng.module('app').controller('reviewList', function($scope, $rootScope, $routeParams, reviewsService, utils) {

        // Get product (with reviews)
        reviewsService.getProduct($routeParams, true, function(response) {
            var content = utils.convertProductResponse(response, $routeParams.id, true);
            $rootScope.title = content.title;
            $scope.pageInfo = content.pageInfo;
            $scope.product = content.product;
            $scope.reviews = content.reviews;
        });

    // }).config(function($routeProvider) {
    //
    //     $routeProvider.when('/product/:id', {
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

})(angular);