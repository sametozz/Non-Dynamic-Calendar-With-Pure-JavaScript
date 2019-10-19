var data = [{ "title": "event 1", "date": "2014/09/25" },
{ "title": "event 2", "date": "2014/09/26", "enddate": "2014/09/29" },
{ "title": "event 3", "date": "2014/09/27" },
{ "title": "event 4", "date": "2014/09/30" }];

var cal = {

  calendarEvents: [],

  list: function () {
    cal.getEvent();

    // DRAW HTML
    // Container & Table
    var container = document.getElementById("cal-container"),
      cTable = document.createElement("table");
    cTable.id = "calendar";
    container.innerHTML = "";
    container.appendChild(cTable);

    // First row - Days
    var cRow = document.createElement("tr"),
      cCell = null,
      days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    for (var d of days) {
      cCell = document.createElement("td");
      cCell.innerHTML = d;
      cRow.appendChild(cCell);
    }
    cRow.classList.add("head");
    cTable.appendChild(cRow);

    // Days in Month
    var daysInMth = 30, // number of days in selected month      
      cRow = document.createElement("tr");
    cRow.classList.add("day");

    for (var i = 0; i < daysInMth; i++) {
      cCell = document.createElement("td");
      cCell.innerHTML = "<div class='dd'>" + (i + 1) + "</div>";

      for (var j = 0; j < cal.calendarEvents.length; j++) {

        if ((i + 1) == cal.calendarEvents[j].startDate[2]) {

          var dayEvents = document.createElement("li");
          var currentEvent = document.createTextNode(cal.calendarEvents[j].title);
          dayEvents.appendChild(currentEvent);
          cCell.appendChild(dayEvents);
        }
        else if (cal.calendarEvents[j].endDate) {
          if ((i+1) > cal.calendarEvents[j].startDate[2] && (i + 1) <= cal.calendarEvents[j].endDate[2]) {
            var dayEvents = document.createElement("li");
            var currentEvent = document.createTextNode(cal.calendarEvents[j].title);
            dayEvents.appendChild(currentEvent);
            cCell.appendChild(dayEvents);
          }
        }
      }

      cRow.appendChild(cCell);
      if (i != 0 && (i + 1) % 7 == 0) {
        cTable.appendChild(cRow);
        cRow = document.createElement("tr");
        cRow.classList.add("day");
      }
    }
    cTable.appendChild(cRow);
  },

  getEvent: function () {

    for (var i = 0; i < data.length; i++) {
      var event = [];
      event.title = data[i].title;
      event.startDate = data[i].date.split("/");
      if (data[i].enddate) {
        event.endDate = data[i].enddate.split("/");
      }
      cal.calendarEvents.push(event);
    }
  }
};

window.addEventListener("load", function () {
  cal.list();
});