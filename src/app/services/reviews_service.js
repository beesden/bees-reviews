/* global angular */

(function(ng) {

    /**
     * @ngdoc service
     * @name app:reviewsService
     *
     * @description - Various services which communicate with the BazaarVoice API
     */
    ng.module('app').service('reviewsService', function(bvService) {

        /**
         * @ngdoc method
         * @name getCategoryList
         * @methodOf app.reviewsService
         * @description Fetch the category list for constructing the category map / hierarchy
         *
         * @returns {$http}
         */
        this.getCategoryList = function(callback) {
            var params = {
                filter: "IsActive:eq:true",
                limit: 100
            };
            bvService.request('categories', params, callback);
        };

        /**
         * @ngdoc method
         * @name getCategoryList
         * @methodOf app.reviewsService
         * @description Fetch a list of product results, optionally filtered by category
         *
         * @param {object} $routeParams List of query string parameters
         * @returns {$http}
         */
        this.getProductListings = function($routeParams, callback) {
            var params = getPaginationParams($routeParams, 12);
            // Add required parameters
            params.filter = ['TotalReviewCount:gte:1'];
            params.include = 'Categories';
            params.stats = 'Reviews';
            // Add category filter
            if ($routeParams.id) {
                params.filter.push('CategoryId:eq:' + $routeParams.id);
            }
            // Get response
            bvService.request('products', params, callback)
        };

        /**
         * @ngdoc method
         * @name getProduct
         * @methodOf app.reviewsService
         * @description Fetch a product, optionally including a list of reviews
         *
         * @param {object} $routeParams List of query string parameters
         * @param {boolean} includeReviews Include fetching of review statistics in the request
         * @returns {$http}
         */
        this.getProduct = function($routeParams, includeReviews, callback) {
            var params = getPaginationParams($routeParams);
            // Add required parameters
            params.filter = 'ProductId:' + $routeParams.id;
            params.include = 'Products';
            if (includeReviews) {
                params.stats = 'Reviews';
            }
            // Get response
            bvService.request('reviews', params, callback)
        };

        /**
         * @ngdoc method
         * @name submitProductReview
         * @methodOf app.reviewsService
         * @description Submit a review form
         *
         * @param {string} productId Product to submit a review for
         * @param {object} reviewForm Form to convert into query string parameters
         * @param {boolean} confirm True for committing changes, false for previewing response
         * @returns {$http}
         */
        this.submitProductReview = function(productId, reviewForm, confirm, callback) {
            var params = {
                action: confirm ? 'submit' : 'preview',
                author: reviewForm.author.$viewValue,
                productId: productId,
                rating: reviewForm.rating.$viewValue,
                reviewText: reviewForm.comment.$viewValue,
                title: reviewForm.title.$viewValue || '',
                userId: reviewForm.email.$viewValue,
                usernickname: reviewForm.author.$viewValue
            };
            // Post response
            bvService.request('submitreview', params, callback, 'POST');
        };

    });

})(angular);