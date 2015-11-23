angular.module('tt-bc')
.controller('mainCtrl', ['$scope', function ($scope) {
	$scope.calendarView = 'month';
	$scope.calendarDay = new Date();

}]);