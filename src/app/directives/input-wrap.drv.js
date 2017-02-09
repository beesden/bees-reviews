/* global angular */

(ng => {

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	ng.module('app').directive('inputWrap', () => ({

		require: ['?^form', 'ngModel'],
		restrict: 'A',
		scope: {
			input: '=inputWrap'
		},
		templateUrl: '/templates/_inputWrap.html',

		link: (scope, element, attrs, ctrls) => {
			let ngModel = ctrls[1];
			scope.formCtrl = ctrls[0];

			ngModel.$formatters.push(value => {
				scope.model = value;
			});

			scope.$watch('model', value => {
				ngModel.$setViewValue(value);
				ngModel.$render();
			})
		}

	}));

})(angular);