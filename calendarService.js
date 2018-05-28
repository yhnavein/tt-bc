angular.module('tt-bc')
.factory('CalendarService', function () {
  var constHolidays = [
    { month: 1, day: 1, name: 'Nowy Rok' },
    { month: 1, day: 6, name: 'Święto Trzech Króli' },
    { month: 5, day: 1, name: 'Święto 1. Maja' },
    { month: 5, day: 3, name: 'Święto 3. Maja' },
    { month: 8, day: 15, name: 'Święto Wojska Polskiego' },
    { month: 11, day: 1, name: 'Wszystkich Świętych' },
    { month: 11, day: 11, name: 'Święto Niepodległości' },
    { month: 12, day: 25, name: 'Boże Narodzenie' },
    { month: 12, day: 26, name: 'Boże Narodzenie' }
  ];

  var easters = {
    2016: { month: 3, day: 28 },
    2017: { month: 4, day: 16 },
    2018: { month: 4, day: 1 },
    2019: { month: 4, day: 21 },
    2020: { month: 4, day: 12 },
    2021: { month: 4, day: 4 }
  };

  var corpusChristis = {
    2016: { month: 5, day: 26 },
    2017: { month: 6, day: 15 },
    2018: { month: 5, day: 31 },
    2019: { month: 5, day: 20 },
    2020: { month: 6, day: 11 },
    2021: { month: 6, day: 3 }
  };

  function findEaster(year) {
    var easter = easters[year];

    if(easter)
      easter.name = 'Wielkanoc';

    return easter;
  }

  function findCorpusChristi(year) {
    var holiday = corpusChristis[year];

    if(holiday)
      holiday.name = 'Boże Ciało';

    return holiday;
  }

  function findHolidays(month, year) {
    var result = [];
    var holidays = angular.copy(constHolidays);

    holidays.push(findEaster(year));
    holidays.push(findCorpusChristi(year));

    angular.forEach(holidays, function(el) {
      if(month !== el.month)
        return;

      result.push(el);
    });

    return result;
  }

  return {
    fillDays: function(days, date) {
      var month = date.month() + 1;
      var year = date.year();
      var holidays = findHolidays(month, year);
      var thisMonthHolidays = holidays.filter(function(el) { return el.month === month; });
      days.forEach(function(el) {
        if(!el.inMonth) {
          return;
        }
        for (var i = 0; i < thisMonthHolidays.length; i++) {
          if(el.label === thisMonthHolidays[i].day) {
            el.isHolidays = true;
            el.dayDesc = thisMonthHolidays[i].name;
            break;
          }
        }
      });

      return days;
    },

    filterDays: function(days) {
      return days.filter(function(el) { return el.inMonth; });
    }
  };
});