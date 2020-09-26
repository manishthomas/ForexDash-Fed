var DateRangePicker = {
  start: moment().subtract(29, "days"),
  end: moment(),
  setStartEnd: function(start, end) {
    console.log("setStartEnd");
    this.start = start;
    this.end = end;
    //this.setDate();
    this.load();
  },
  setDate: function(start, end) {
    $("#start_date").html(start.format("MMMM D, YYYY"));
    $("#end_date").html(end.format("MMMM D, YYYY"));
    console.log(
      start.format("MMMM D, YYYY") + " => " + end.format("MMMM D, YYYY")
    );
  },
  load: function() {
    console.log("load");
    $(".date-range-selector").daterangepicker(
      {
        startDate: this.start,
        endDate: this.end,
        alwaysShowCalendars: true,
        opens: "center",
        ranges: {
          Today: [moment(), moment()],
          Yesterday: [
            moment().subtract(1, "days"),
            moment().subtract(1, "days")
          ],
          "Last 7 Days": [moment().subtract(6, "days"), moment()],
          "Last 30 Days": [moment().subtract(29, "days"), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
          "Last Month": [
            moment()
              .subtract(1, "month")
              .startOf("month"),
            moment()
              .subtract(1, "month")
              .endOf("month")
          ]
        }
      },
      function(start, end) {
        console.log(this);
        DateRangePicker.setDate(start, end);
      }
    );
  }
};
DateRangePicker.setStartEnd(DateRangePicker.start, DateRangePicker.end);
