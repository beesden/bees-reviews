/* global angular */

(function(ng) {

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	ng.module('app').directive('inputWrap', function() {

		return {

			require: ['?^form', 'ngModel'],
			restrict: 'A',
			scope: {
				input: '=inputWrap'
			},
			templateUrl: '/templates/_inputWrap.html',

			link: function(scope, element, attrs, ctrls) {
				var ngModel = ctrls[1];
				scope.formCtrl = ctrls[0];

				ngModel.$formatters.push(function(value) {
					scope.model = value;
				});

				scope.$watch('model', function(value) {
					ngModel.$setViewValue(value);
					ngModel.$render();
				})
			}

		}

	});

})(angular);