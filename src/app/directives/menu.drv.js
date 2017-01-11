/* global angular */

(function(ng) {

    /**
     * @ngdoc controller
     * @name app:mainMenu
     *
     * @description - Display all the categories in the menu.
     */
    ng.module('app').directive('appMainNav', function($window, reviewsService) {

        return {

            restrict: 'A',
            templateUrl: '/templates/_header.html',

            link: function(scope) {

                // Add the category 'hierarchy'
                reviewsService.getCategoryList(function(response) {

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
                scope.selectCategory = function(category) {
                    if (scope.currentCategory === category.Id) {
                        delete scope.currentCategory;
                    } else {
                        scope.currentCategory = category.Id;
                    }
                };

            }

        }

    });

})(angular);