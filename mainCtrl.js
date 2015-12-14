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

	function sumHours() {
		var workingDays = $scope.days.count(function(el) {
			return el.dayType == null || el.dayType < 1;
		});

		return workingDays * 8;
	}

	$scope.saveBasicData = function() {
		localStorage.setItem('basicData', JSON.stringify($scope.timesheet.basic));
	};

	$scope.saveAndPrint = function() {
		$scope.timesheet.days = $scope.days;
		var date = moment();
		$scope.timesheet.date = {
			month: date.month() + 1,
			year: date.year()
		};
		$scope.timesheet.hours = sumHours();
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
}])
.filter('monthName', function() {
  var monthsHashTable = {
    '1': 'styczeń',
    '2': 'luty',
    '3': 'marzec',
    '4': 'kwiecień',
    '5': 'maj',
    '6': 'czerwiec',
    '7': 'lipiec',
    '8': 'sierpień',
    '9': 'wrzesień',
    '10': 'październik',
    '11': 'listopad',
    '12': 'grudzień'
  };
  return function(monthNo) {
    if(!monthNo)
      return null;

    return monthsHashTable[monthNo];
  };
});