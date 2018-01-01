(function(angular) {
	'use strict';
	// Declare app level module which depends on views, and components
	var moviecat = angular.module('moviecat', 
		['ngRoute',
		'moviecat.movie_detail', 
		'moviecat.movie_list',		
		'moviecat.directive.auto_focus'
		]);
	moviecat.constant('AppConfig', {
		pageSize:10,
		listApiAddress:'http//api.douban.com/v2/movie/',
		detailApiAddress:'http//api.douban.com/v2/subject/',		
	});
	moviecat.config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({ redirectTo: '/in_theaters/1' });
	}]).controller('SearchController', ['$scope','$route','AppConfig', function($scope,$route,AppConfig) {
		$scope.input = '';
		$scope.search = function () {
			$route.updateParams({category:'search',q:$scope.input});
		}
		
	}]);
})(angular);
