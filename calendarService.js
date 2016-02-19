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

  var HOLIDAY = 1;

  var easters = {
    2016: { month: 3, day: 28 },
    2017: { month: 4, day: 16 }
  };

  function findEaster(year) {
    var easter = easters[year];

    if(easter)
      easter.name = 'Wielkanoc';

    return easter;
  }

  return {
    findHolidays: function(month, year) {
      var result = [];

      constHolidays.push(findEaster(year));

      angular.forEach(constHolidays, function(el) {
        if(month !== el.month)
          return;

        result.push(el);
      });

      return result;
    },

    fillDays: function(days) {
      var month = days.last().date.month() + 1;
      var thisMonthHolidays = constHolidays.filter(function(el) { return el.month === month; });
      days.forEach(function(el) {
        for (var i = 0; i < thisMonthHolidays.length; i++) {
          if(el.label === thisMonthHolidays[i].day) {
            el.dayType = HOLIDAY;
            el.dayDesc = thisMonthHolidays[i].name;
            break;
          }
        }
      });

      return days;
    }
  };
});