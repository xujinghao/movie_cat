(function(angular) {
	'use strict';
	var module = angular.module('moviecat.movie_list', ['ngRoute', 'moviecat.services.http']);
	//配置路由
	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/:category/:page', {
			templateUrl: 'movie_list/view.html',
			controller: 'MovieListController'
		});
	}]);
	module.controller('MovieListController', ['$scope', '$route', '$routeParams', 'HttpService','AppConfig',
		function($scope, $route, $routeParams, HttpService,AppConfig) {
			var count = 10;
			var page = parseInt($routeParams.page);
			var start = (page - 1) * count;
			//控制器
			//1、数据
			$scope.loading = true;
			$scope.subjects = [];
			$scope.title = 'Loading...';
			$scope.totalCount = 0;
			$scope.totalPages = 0;
			$scope.currentPage = page;
			HttpService.jsonp('http://api.douban.com/v2/movie/'+$routeParams.category, 
				{ start: start, count: count, q: $routeParams.q},
				function(data) {
				$scope.title = data.title;
				$scope.subjects = data.subjects;
				$scope.totalCount = data.total;
				$scope.totalPages = Math.ceil($scope.totalCount / count);
				$scope.loading = false;
				$scope.$apply();
			});
			//行为操作
			$scope.go = function(p) {
				if (p >= 1 && p <= $scope.totalPages) {
					$route.updateParams({ page: p });
				}
			};
		}
	]);
})(angular);
