(function(angular) {
	'use strict';
	angular.module('moviecat.directive.auto_focus', []).directive('autoFocus', ['$location', function($location) {
		return {
			restrict: 'A',
			link: function($scope, iElm, iAttrs, controller) {
				$scope.$location = $location;
				$scope.$watch('$location.path()', function(now) {
					var aLink = iElm.children().attr('href');
					var type = aLink.replace(/#(\/.+?)\/\d/, '$1');
					if (now.startsWith(type)) {
						iElm.parent().children().removeClass('active');
						iElm.addClass('active');
					}
				});
			}
		}
	}]);
})(angular);
