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
       $routeProvider.otherwise({redirectTo: '/'});

    });

})(angular);