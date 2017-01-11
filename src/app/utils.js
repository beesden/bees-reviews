/* global angular */

(function(ng) {

    /**
     * @ngdoc overview
     * @name app
     */
    var app = ng.module('app', []);

    /**
     * @ngdoc object
     * @name app:utils
     *
     * @description - Various services which convert data from the BazaarVoice API
     */
    app.factory('utils', function() {

        /*
         * Calculate the pagination information based on the API response.
         *
         * @param path Unique path name for data retrival, e.g. 'products', 'reviews', 'categories'
         * @param $routeParams Object containing URL query parameters to be app to the URL
         * @param method=GET - URL method
         */
        function getPagination(response) {

            var pageInfo = {
                    offset: response.Offset,
                    perPage: response.Limit,
                    totalResults: response.TotalResults
                },
                padding = 2;

            pageInfo.current = pageInfo.offset ? Math.ceil(pageInfo.offset / pageInfo.perPage) + 1 : 1;
            pageInfo.totalPages = Math.ceil(pageInfo.totalResults / pageInfo.perPage);

            // First page should show up to X before the current page
            pageInfo.firstPage = (pageInfo.totalPages - pageInfo.current) > padding ? pageInfo.current - padding : pageInfo.totalPages - (2 * padding);
            pageInfo.firstPage = pageInfo.firstPage < 1 ? 1 : pageInfo.firstPage;

            // Last page should then show up to X after the current page
            pageInfo.lastPage = pageInfo.current <= padding ? (2 * padding + 2) - pageInfo.firstPage : pageInfo.current + padding;
            pageInfo.lastPage = pageInfo.lastPage > pageInfo.totalPages ? pageInfo.totalPages : pageInfo.lastPage;

            return pageInfo;
        };

        return {

            /**
             * @ngdoc method
             * @name convertCategoryResponse
             * @methodOf app.reviewsService
             * @description Convert and validate the category response
             *
             * @param response - API response object
             * @param categoryId - Requested category Id
             * @returns {object}
             */
            convertCategoryResponse: function(response, categoryId) {

                // Get the product object
                var content = {},
                    categoryMap = response.Includes.Categories;

                if (categoryMap && categoryId) {
                    content.category = categoryMap[categoryId];
                    content.title = content.category.Name;
                }
                content.productList = response.Results;
                content.pageInfo = getPagination(response);

                return content;

            },

            /**
             * @ngdoc method
             * @name convertProductResponse
             * @methodOf app.reviewsService
             * @description Convert and validate the product reviews response
             *
             * @param response - API response object
             * @param productId - Requested product Id
             * @param includeRatings - Toggle whether to include review breakdowns
             * @returns {object}
             */
            convertProductResponse: function(response, productId, includeRatings) {

                // Get the product object
                var content = {},
                    productMap = response.Includes.Products;

                if (productMap) {
                    content.product = productMap[productId];
                    content.title = content.product.Name;
                }
                content.pageInfo = getPagination(response);

                // Build review info
                if (includeRatings && content.product) {
                    // Review results
                    content.reviews = response.Results;
                    // Review rating graph
                    var dist = content.product.ReviewStatistics.RatingDistribution,
                        percent;
                    content.product.RatingsGraph = {};
                    for (var i = 0; i < dist.length; i++) {
                        percent = (dist[i].Count / content.product.ReviewStatistics.TotalReviewCount) * 100;
                        content.product.RatingsGraph[dist[i].RatingValue] = {value: dist[i].Count, percent: percent};
                    }
                }

                return content;

            }

        }
    });

})(angular);