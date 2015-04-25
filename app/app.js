/* global angular */

/**
 * @ngdoc overview
 * @name app
 * @description Framework for fetching ratings / reviews information.
 */
 var app = angular.module('app', ['app.controller', 'app.service', 'app.filters', 'ngRoute', 'ui.bootstrap']);

/**
 * Application configuration
 */
app.config(function($routeProvider, $locationProvider) {

	var config = {
		productList: '/:id?',
		reviewList: '/product/:id',
		reviewWrite: '/review/:id',
		reviewSubmit: '/review/:id/submit'
	}

	// use the HTML5 History API
	$locationProvider.html5Mode(true);

	// Configure URL mappings
	for (var key in config) {
		$routeProvider.when(config[key], {templateUrl: '/view/' + key + '.html', controller: key})
	}
	$routeProvider.otherwise({redirectTo: '/' });

});

/**
 * Fetch global data on startup, such as categories, for global templating (header, footer, etc)
 */
app.run(['$rootScope', 'reviewsService', function($rootScope, reviewsService) {

	$rootScope.categoryList = {};
	$rootScope.hierarchy = {};

	// Add the category 'hierarchy'
	reviewsService.getCategoryList(function(response) {

		var childCategories = [];

		// Put parent categories into map
		for (var i = 0; i < response.Results.length; i++) {
			var category = response.Results[i];
			category.children = [];
			$rootScope.categoryList[category.Id] = category;
		}

		// Append child categories into map
		for (var i = 0; i < response.Results.length; i++) {
			var category = response.Results[i];
			if (category.ParentId) {
				if (!$rootScope.hierarchy[category.ParentId]) {
					$rootScope.hierarchy[category.ParentId] = [];
				}
				$rootScope.hierarchy[category.ParentId].unshift(category.Id);
			} else if (!$rootScope.hierarchy[category.Id]) {
				$rootScope.hierarchy[category.Id] = []
			}
		}
	});

}]);