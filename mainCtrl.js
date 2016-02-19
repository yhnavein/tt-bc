angular.module('tt-bc')
.controller('mainCtrl', ['$scope', 'calendarHelper', 'CalendarService', function ($scope, calendarHelper, calendarService) {
	$scope.timesheet = {
		calendarDay: new Date()
	};
	$scope.curMonth = moment().month() + 1;
	$scope.curDate = moment();
	$scope.curDateJs = moment().toDate();

	$scope.weekDays = [
		'Poniedziałek',
		'Wtorek',
		'Środa',
		'Czwartek',
		'Piatek',
		'Sobota',
		'Niedziela'
	];

	function loadBasicData() {
		var data = localStorage.getItem('basicData');
		if(!data)
			return { basic: {} };

		return { basic: JSON.parse(data) };
	}

	$scope.timesheet = loadBasicData();
	var days = calendarHelper.getMonthView($scope.timesheet.calendarDay);
	$scope.days = calendarService.fillDays(days, $scope.curDate);

	function sumDays() {
		return $scope.days.count(function(el) {
			return el.inMonth && !el.isHolidays && !el.isVacation && !el.isWeekend;
		});
	}

	$scope.saveBasicData = function() {
		localStorage.setItem('basicData', JSON.stringify($scope.timesheet.basic));
	};

	$scope.markVacation = function(day) {
		day.isVacation = !day.isVacation;
	};

	$scope.saveAndPrint = function() {
		$scope.timesheet.days = calendarService.filterDays( $scope.days );
		var date = moment();
		$scope.timesheet.date = {
			month: date.month() + 1,
			year: date.year()
		};
		$scope.timesheet.daysSummary = sumDays();
		$scope.timesheet.hours = sumDays() * 8;

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
	$scope.infoVisible = true;
	$scope.hideInfo = function() {
		$scope.infoVisible = false;
	};
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
})
.filter('capitalize', function() {
  return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  };
});