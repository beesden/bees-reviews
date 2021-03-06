/* global angular */

{

	/**
	 * @ngdoc service
	 * @name app:reviewDataService
	 *
	 * @description - Various services which communicate with the BazaarVoice API
	 */
	angular.module('app').service('reviewDataService', function(bvService) {

		/**
		 * @ngdoc method
		 * @name getCategoryList
		 * @methodOf app.reviewDataService
		 * @description Fetch the category list for constructing the category map / hierarchy
		 *
		 * @returns {$http}
		 */
		this.getCategoryList = callback => {
			let params = {
				filter: "IsActive:eq:true",
				limit: 100
			};
			return bvService.request('categories', params, callback);
		};

		/**
		 * @ngdoc method
		 * @name getCategoryList
		 * @methodOf app.reviewDataService
		 * @description Fetch a list of product results, optionally filtered by category
		 *
		 * @param {object} params List of query string parameters
		 * @returns {$http}
		 */
		this.getProductListings = params => {
			let query = bvService.getPaginationParams(params, 12);
			// Add required parameters
			query.filter = ['TotalReviewCount:gte:1'];
			query.include = 'Categories';
			query.stats = 'Reviews';
			// Add category filter
			if (params.category) {
				query.filter.push('CategoryId:eq:' + params.category);
			}
			// Get response
			return bvService.request('products', query)
		};

		/**
		 * @ngdoc method
		 * @name getProduct
		 * @methodOf app.reviewDataService
		 * @description Fetch a product, optionally including a list of reviews
		 *
		 * @param {object} params List of query string parameters
		 * @param {boolean} includeReviews Include fetching of review statistics in the request
		 * @returns {$http}
		 */
		this.getProduct = (params, includeReviews) => {
			let query = bvService.getPaginationParams(params);
			// Add required parameters
			query.filter = `ProductId:${params.product}`;
			query.include = 'Products';
			if (includeReviews) {
				query.stats = 'Reviews';
			}
			// Get response
			return bvService.request('reviews', query);
		};

		/**
		 * @ngdoc method
		 * @name submitProductReview
		 * @methodOf app.reviewDataService
		 * @description Submit a review form
		 *
		 * @param {string} productId Product to submit a review for
		 * @param {object} reviewForm Form to convert into query string parameters
		 * @param {boolean} review True if the submission should be reviewed first
		 * @returns {$http}
		 */
		this.submitProductReview = (productId, reviewForm, review) => {
			let params = {
				action: review ? 'preview' : 'submit',
				author: reviewForm.author,
				productId: productId,
				rating: reviewForm.rating || 3,
				reviewText: reviewForm.comment,
				title: reviewForm.title,
				userEmail: reviewForm.email,
				userId: reviewForm.author,
				userNickname: reviewForm.author.replace(/ +/g, '') + Date.now()
			};
			// Post response
			return bvService.request('submitreview', params, 'POST');
		};

	});

}