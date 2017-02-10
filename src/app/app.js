/* global angular */

{

	/**
	 * @ngdoc overview
	 * @name app
	 * @description Framework for fetching ratings / reviews information.
	 */
	angular.module('app', [
		'ngRoute'
	]).config(($locationProvider, $routeProvider) => {

		$locationProvider.html5Mode(true);

		$routeProvider
		// Product list
			.when('/:category?', {
				resolve: {
					productList: ($route, reviewDataService) => reviewDataService.getProductListings($route.current.params)
				},
				resolveAs: 'data',
				templateUrl: '/templates/productList.html'
			})
			// Product details
			.when('/:category/:product', {
				resolve: {
					product: ($route, reviewDataService) => reviewDataService.getProduct($route.current.params, true)
				},
				resolveAs: 'data',
				templateUrl: '/templates/productDetails.html'
			})
			.otherwise({redirectTo: '/'});

	});

}