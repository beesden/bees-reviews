/* global angular */

(function(ng) {


    /**
     * @ngdoc service
     * @name app:reviewsService
     *
     * @description - Various services which communicate with the BazaarVoice API
     */
    ng.module('app').service('bvService', function($http, $sce) {

        var config = {
            bv: {
                params: {
                    passkey: '2cpdrhohmgmwfz8vqyo48f52g',
                    apiversion: 5.4
                },
                url: '//stg.api.bazaarvoice.com'
            }
        };

        /**
         * Lookup data from BazaarVoice
         *
         * @param path
         * @param params
         * @param callback
         * @param method
         */
        this.request = function(path, params, callback, method) {

            // Build the default BV API url
            var url = config.bv.url + '/data/' + path + '.json?';
            params = ng.merge({}, params, config.bv.params);

            // app parameters to the URL
            for (var key in params) {
                if (typeof params[key] === 'object') {
                    for (var i = 0; i < params[key].length; i++) {
                        url += key + '=' + params[key][i] + '&';
                    }
                } else {
                    url += key + '=' + params[key] + '&';
                }
            }

            // Return the function which can be extended with '.success() {}'
            $http({
                method: method || 'JSONP',
                params: params,
                url: $sce.trustAsResourceUrl(url)
            }).then(function(response) {
                    if (typeof callback === 'function') {
                        return callback(response.data);
                    }
                    return response.data;
                }, function(response) {

                    console.error(response);
                }
            );
        };

        /**
         * Build pagination parameters
         *
         * @param pageParams
         * @param limit
         * @returns {{offset: number, limit: (*|number)}}
         */
        this.getPaginationParams = function(pageParams, limit) {
            var params = {
                offset: 0,
                limit: limit || 10
            };
            // Page parameter
            if (!isNaN(pageParams.page) && pageParams.page > 0) {
                params.offset = (pageParams.page - 1) * params.limit;
            }
            return params;
        };

    });

})(angular);