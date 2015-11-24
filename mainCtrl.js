angular.module('tt-bc')
.controller('mainCtrl', ['$scope', 'calendarHelper', 'CalendarService', function ($scope, calendarHelper, calendarService) {
	$scope.timesheet = {
		calendarDay: new Date()
	};

	function loadBasicData() {
		var data = localStorage.getItem('basicData');
		if(!data)
			return { basic: {} };

		return { basic: JSON.parse(data) };
	}

	$scope.timesheet = loadBasicData();
	var days = calendarHelper.getMonthView($scope.timesheet.calendarDay);
	$scope.days = calendarService.fillDays(days);

	$scope.saveBasicData = function() {
		localStorage.setItem('basicData', JSON.stringify($scope.timesheet.basic));
	};

	$scope.saveAndPrint = function() {
		$scope.timesheet.days = $scope.days;
		localStorage.setItem('timesheet', JSON.stringify($scope.timesheet));
		window.location = './print.html';
	};
}])
.controller('printCtrl', ['$scope', function ($scope) {
	function loadBasicData() {
		var data = localStorage.getItem('timesheet');
		if(!data) {
			$scope.error = 'Nie znaleziono TimeSheeta do wydrukowania!';
			return {};
		}

		return JSON.parse(data);
	}

	$scope.timesheet = loadBasicData();
}]);