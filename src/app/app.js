/* global angular */

(function(ng) {

    /**
     * @ngdoc overview
     * @name app
     * @description Framework for fetching ratings / reviews information.
     */
    ng.module('app', [
        'ngRoute'
    ]).config(function($locationProvider, $routeProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider
            // Product list
			.when('/:category?', {
				resolve: {
					productList: function($route, reviewDataService) {
						return reviewDataService.getProductListings($route.current.params);
					}
				},
				resolveAs: 'data',
				templateUrl: '/templates/productList.html'
			})
			// Product details
			.when('/:category/:product', {
				resolve: {
					product: function($route, reviewDataService) {
						return reviewDataService.getProduct($route.current.params, true);
					}
				},
				resolveAs: 'data',
				templateUrl: '/templates/productDetails.html'
			})
			// Review form
			.when('/:category/:product/review', {
				resolve: {
					productList: function($route, reviewDataService) {
						return reviewDataService.getProductListings($route.current.params);
					}
				},
				resolveAs: 'data',
				templateUrl: '/templates/productList.html'
			})
            .otherwise({redirectTo: '/'});

    });

})(angular);