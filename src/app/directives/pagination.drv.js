/* global angular */

(function(ng) {

	/**
	 * @ngdoc directive
	 * @name app:appPagination
	 *
	 * @description - Build a list of pagination links
	 */
	ng.module('app').directive('appPagination', function() {

		return {

			restrict: 'A',
			scope: {
				'padding': '@appPaginationPadding',
				'pagination': '=appPagination',
				'summary': '@appPaginationSummary'
			},
			templateUrl: '/templates/_pagination.html',

			link: function(scope) {

				scope.$watch('pagination', function(pagination) {

					var padding = scope.padding || 2;

					if (!pagination) {
						return;
					}

					var pageInfo = {
						offset: pagination.Offset,
						perPage: pagination.Limit,
						totalResults: pagination.TotalResults
					};

					pageInfo.current = pageInfo.offset ? Math.ceil(pageInfo.offset / pageInfo.perPage) + 1 : 1;
					pageInfo.totalPages = Math.ceil(pageInfo.totalResults / pageInfo.perPage);

					// First page should show up to X before the current page
					pageInfo.firstPage = (pageInfo.totalPages - pageInfo.current) > padding ? pageInfo.current - padding : pageInfo.totalPages - (2 * padding);
					pageInfo.firstPage = pageInfo.firstPage < 1 ? 1 : pageInfo.firstPage;

					// Last page should then show up to X after the current page
					pageInfo.lastPage = pageInfo.current <= padding ? (2 * padding + 2) - pageInfo.firstPage : pageInfo.current + padding;
					pageInfo.lastPage = pageInfo.lastPage > pageInfo.totalPages ? pageInfo.totalPages : pageInfo.lastPage;

					// Calculate indices
					pageInfo.start = Math.max(0, (pageInfo.current - 1) * pageInfo.perPage + 1);
					pageInfo.end = Math.min(pageInfo.totalResults, pageInfo.current * pageInfo.perPage);

					// Add next / previous pages
					pageInfo.previous = Math.max(1, pageInfo.current - 1);
					pageInfo.next = Math.min(pageInfo.totalPages, pageInfo.current + 1);

					scope.pageInfo = pageInfo;

				})

			}

		}

	});

})(angular);