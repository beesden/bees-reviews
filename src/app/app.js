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
            .when('/:id?', {
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