/* global angular */

(ng =>{

	/**
	 * @ngdoc directive
	 * @name app:mainMenu
	 *
	 * @description - Display all the categories in the menu.
	 */
	ng.module('app').directive('appMainNav', ($route, reviewDataService) => ({

		restrict: 'A',
		templateUrl: '/templates/_menu.html',

		link: scope => {

			// Add the category 'hierarchy'
			reviewDataService.getCategoryList().then(response => {

				scope.categories = [];
				var categoryMap = {};

				// Create map of categories
				response.Results.forEach(category => {
					categoryMap[category.Id] = ng.merge({}, category, {children: []});
				});

				// Add to hierarchy
				response.Results.forEach(category => {
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
			 * @param $event
			 * @param category
			 */
			scope.selectCategory = ($event, category) => {
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

	}));

})(angular);