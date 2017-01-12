/* global angular */
(function(ng) {

    /**
     * @ngdoc filter
     * @name app:urlQuery
     *
     * @description - Create url query parameters on the current URL
     */
    ng.module('app').filter('urlQuery', function($httpParamSerializer, $location) {

        return function(params) {

            var url = $location.path();
            serializedParams = $httpParamSerializer(params);

            if (serializedParams.length > 0) {
                url += '?' + serializedParams;
            }

            return url.indexOf('/') === 0 ? url.slice(1) : url;
        }

    });

})(angular);