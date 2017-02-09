/* global angular */

(ng =>{

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	ng.module('app').directive('rating', () => ({

		require: 'ngModel',
		restrict: 'E',
		scope: {
			editable: '=editable'
		},
		templateUrl: '/templates/_rating.html',

		link: (scope, element, attrs, ngModel) => {

			var currentRating;

			/**
			 * @ngdoc method
			 * @name mouseOn
			 * @methodOf app.rating
			 * @description Update the display rating on hover
			 *
			 * @param value rating value
			 */
			scope.mouseOn = value => {
				if (scope.editable) {
					scope.currentRating = value;
				}
			};

			/**
			 * @ngdoc method
			 * @name mouseOut
			 * @methodOf app.rating
			 * @description Reset display rating on hover out
			 */
			scope.mouseOut = () => {
				if (scope.editable) {
					scope.currentRating = currentRating;
				}
			};

			/**
			 * @ngdoc method
			 * @name select
			 * @methodOf app.rating
			 * @description Select a specific rating to be displayed and returned
			 *
			 * @param value rating value
			 */
			scope.select = value => {
				if (scope.editable) {
					scope.currentRating = currentRating = value;
					ngModel.$setViewValue(value);
					ngModel.$setDirty(true);
					ngModel.$setTouched(true);
				}
			};

			ngModel.$formatters.push(value => {
				scope.currentRating = currentRating = value;
			});

			ngModel.$validators.required = (modelValue, viewValue) => !attrs.required || viewValue > 0;

		}

	}));

})(angular);