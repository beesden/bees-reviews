/* global angular */

(function(ng) {

	/**
	 * @ngdoc directive
	 * @name app:mainMenu
	 *
	 * @description - Display all the categories in the menu.
	 */
	ng.module('app').directive('appMainNav', function($route, reviewDataService) {

		return {

			restrict: 'A',
			templateUrl: '/templates/_menu.html',

			link: function(scope) {

				// Add the category 'hierarchy'
				reviewDataService.getCategoryList().then(function(response) {

					scope.categories = [];
					var categoryMap = {};

					// Create map of categories
					response.Results.forEach(function(category) {
						categoryMap[category.Id] = ng.merge({}, category, {children: []});
					});

					// Add to hierarchy
					response.Results.forEach(function(category) {
						if (category.ParentId) {
							categoryMap[category.ParentId].children.push(category);
						} else {
							scope.categories.push(categoryMap[category.Id]);
						}
					});

				});

				/**
				 * Select a category to view it's children
				 *
				 * @param category
				 */
				scope.selectCategory = function($event, category) {
					if (scope.currentCategory === category.Id) {
						delete scope.currentCategory;
					} else {
						scope.currentCategory = category.Id;
					}
					if (category.children.length) {
						$event.preventDefault();
					}
				};

			}

		}

	});

})(angular);