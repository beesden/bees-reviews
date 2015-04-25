/* global angular */

/**
 * @ngdoc overview
 * @name app.service
 */
var appServices = angular.module('app.service', []);

/**
 * @ngdoc service
 * @name app.service:reviewsService
 *
 * @description - Various services which communicate with thethe BazaarVoice API
 */
appServices.factory('reviewsService', function($http) {

	var config = {
		bv: {
			key: '2cpdrhohmgmwfz8vqyo48f52g',
			url: '//stg.api.bazaarvoice.com',
			ver: 5.4
		}
	}

	/*
	 * Submit a request to the BV service and return a response in JSON format.
	 *
	 * @param {string} path Unique path name for data retrival, e.g. 'products', 'reviews', 'categories'
	 * @param {object} params Object containing URL query parameters to be appended to the URL
	 * @param {string} [method=GET] URL method
	 * @param {function} callback Function to call on successful response
	*/
	function getConnection(path, params, callback, method) {

		// Build the default BV API url
		var url = config.bv.url + '/data/' + path + '.json?';

		// Add consistent parameters to object
		if (!params) {
			params = {};
		}
		params.apiversion = config.bv.ver;
		params.passkey = config.bv.key;
		if (!method) {
			params.callback = 'JSON_CALLBACK';
		}

		// Append parameters to the URL
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
			url: url
		}).success(function(response) {
			if (typeof callback === 'function') {
				callback(response);
			}
		}).error(function(response) {
			console.error(response);
		});
	}

	/*
	 * Build pagination parameters based on the current URL parameters
	 *
	 * @param path Unique path name for data retrival, e.g. 'products', 'reviews', 'categories'
	 * @param $routeParams Object containing URL query parameters to be appended to the URL
	 * @param method=GET - URL method
	*/
	function getPaginationParams($routeParams, limit) {
		var params = {
			offset: 0,
			limit: limit || 10
		}
		// Results per page
		if (limit) {
			params.limit = limit;
		}
		// Page parameter
		if (!isNaN($routeParams.page) && $routeParams.page > 0) {
			params.offset = ($routeParams.page - 1) * params.limit;
		}
		return params;
	}

	return {

		/**
		 * @ngdoc method
		 * @name getCategoryList
		 * @methodOf app.service.reviewsService
		 * @description Fetch the category list for constructing the category map / hierarchy
		 *
		 * @returns {$http}
		 */
		getCategoryList: function(callback) {
			var params = {
				filter: "IsActive:eq:true",
				limit: 100
			}
			getConnection('categories', params, callback);
		},

		/**
		 * @ngdoc method
		 * @name getCategoryList
		 * @methodOf app.service.reviewsService
		 * @description Fetch a list of product results, optionally filtered by category
		 *
		 * @param {object} $routeParams List of query string parameters
		 * @returns {$http}
		 */
		getProductListings: function($routeParams, callback) {
			var params = getPaginationParams($routeParams, 12);
			// Add required parameters
			params.filter = ['TotalReviewCount:gte:1'];
			params.include = 'Categories';
			params.stats = 'Reviews'
			// Add category filter
			if ($routeParams.id) {
				params.filter.push('CategoryId:eq:' + $routeParams.id);
			}
			// Get response
			getConnection('products', params, callback)
		},

		/**
		 * @ngdoc method
		 * @name getProduct
		 * @methodOf app.service.reviewsService
		 * @description Fetch a product, optionally including a list of reviews
		 *
		 * @param {object} $routeParams List of query string parameters
		 * @param {boolean} includeReviews Include fetching of review statistics in the request
		 * @returns {$http}
		 */
		getProduct: function($routeParams, includeReviews, callback) {
			var params = getPaginationParams($routeParams);
			// Add required parameters
			params.filter = 'ProductId:' + $routeParams.id;
			params.include = 'Products';
			if (includeReviews) {
				params.stats = 'Reviews';
			}
			// Get response
			getConnection('reviews', params, callback)
		},

		/**
		 * @ngdoc method
		 * @name submitProductReview
		 * @methodOf app.service.reviewsService
		 * @description Submit a review form
		 *
		 * @param {string} $productId Product to submit a review for
		 * @param {object} reviewForm Form to convert into query string parameters
		 * @param {boolean} confirm True for committing changes, false for previewing response
		 * @returns {$http}
		 */
		submitProductReview: function(productId, reviewForm, confirm, callback) {
			var params = {
					action: confirm ? 'submit' : 'preview',
					author: reviewForm.author.$viewValue,
					productId: productId,
					rating: reviewForm.rating.$viewValue,
					reviewText: reviewForm.comment.$viewValue,
					title: reviewForm.title.$viewValue || '',
					userId: reviewForm.email.$viewValue,
					usernickname: reviewForm.author.$viewValue
				}
			// Post response
			getConnection('submitreview', params, callback, 'POST');
		}
	}

});