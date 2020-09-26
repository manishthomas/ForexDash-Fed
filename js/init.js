var $dataTable = $("#datatable");

$(function() {
  $("select").formSelect();
  $("#reject_remark,#approve_remark").characterCounter();

  $(".modal").modal({
    // dismissible: false
    // startingTop: "4%",
    endingTop: "5%"
  });
  // $("#visa_modal").modal("open");

  // new DateRangePicker(moment().subtract(40, "days"), moment());
  new DateRangePicker(moment("21-Jun-2018", "DD-MMM-YYYY"), moment());

  // ** only for Testing
  new InitDataTable();
});

/** DataTable initialization */
function InitDataTable() {
  $dataTable.dataTable({
    processing: true,
    order: [[5, "desc"]],
    // serverSide: true,
    ajax: {
      url: "../Assets/applications.json",
      type: "GET"
    },
    columns: [
      { data: "reference_no" },
      { data: "channel" },
      { data: "name" },
      { data: "fyc_amt" },
      { data: "account_no" },
      {
        data: "request_date",
        render: function(data) {
          // return data;
          // return moment(data, "DD-MMM-YYYY").format("YYYYMMDD");
          return (
            "<span class='hide'>" +
            moment(data, "DD-MMM-YYYY").format("YYYYMMDD") +
            "</span>" +
            data
          );
        }
      },
      {
        data: "status",
        render: function(data, type, row) {
          return {
            P: "<span class='badge orange'>Pending</span>",
            F: "<span class='badge blue'>Forwarded</span>",
            A: "<span class='badge green'>Approved</span>",
            R: "<span class='badge red'>Rejected</span>"
          }[data];
        }
      }
    ],
    // Table Styling and Structure
    responsive: true,
    pageLength: 10,
    stripeClasses: [],
    pagingType: "full_numbers",
    scrollY: "60vh",
    scrollCollapse: !0,
    language: {
      paginate: {
        first: '<img src="img/icons/first_page.svg" class="pagination-i" />',
        next: '<img src="img/icons/next.svg" class="pagination-i" />',
        previous: '<img src="img/icons/before.svg" class="pagination-i" />',
        last: '<img src="img/icons/last_page.svg" class="pagination-i" />'
      },
      //processing: "<div>testing</div>",
      lengthMenu:
        "<select>" +
        '<option value="5">5</option>' +
        '<option value="10">10</option>' +
        '<option value="25">25</option>' +
        '<option value="50">50</option>' +
        '<option value="100">100</option>' +
        '<option value="-1">All</option>' +
        "</select><label>Rows/page</label></div>",
      search: "<label class='datatable-search'>Search</label>",
      searchPlaceholder: "Enter Keywords Here",
      info: "_START_ -_END_ of _TOTAL_"
    },
    fixedHeader: true,
    dom: '<"pull-left"f><"pull-right"B>t<"footer-wrapper"l<ip>>',
    // dom: "Bfrtlip",
    buttons: [
      {
        extend: "excelHtml5",
        text:
          "<img src='img/icons/export-excel.svg' class='export-excel-i'/> Export List",
        className: "waves-effect waves-light"
      }
    ],
    // bAutoWidth: false,
    drawCallback: function(t) {
      var e = this.api();
      $(e.table().container())
        .find("a.paginate_button")
        .addClass("waves-effect waves-circle");
    },
    initComplete: function(settings, json) {
      $("select").formSelect();
      console.log("initComplete");
    }
  });
}

/** DateRangePicker initialization */
function DateRangePicker(start, end) {
  this.start = start;
  this.end = end;
  $("#start_date").html(this.start.format("DD-MMM-YYYY"));
  $("#end_date").html(this.end.format("DD-MMM-YYYY"));
  $(".date-range-selector").daterangepicker(
    {
      startDate: this.start,
      endDate: this.end,
      alwaysShowCalendars: true,
      opens: "left",
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
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
      $("#start_date").html(start.format("DD-MMM-YYYY"));
      $("#end_date").html(end.format("DD-MMM-YYYY"));
      $dataTable.DataTable().draw();
      // console.log(start.format("YYYYMMDD"));
      // console.log(end.format("YYYYMMDD"));
      // 20191021;
      // 20190531;
      // dateFilter("20191021", "20190531");
      console.log(start.format("YYYYMMDD") + "---" + end.format("YYYYMMDD"));
      //dateFilter(start.format("YYYYMMDD"), end.format("YYYYMMDD"));
      // console.log(
      //   start.format("DD-MMM-YYYY") + " => " + end.format("DD-MMM-YYYY")
      // );
    }
  );
}

//*** Passport Expiry DatePicker Init */
$(function() {
  $("#passport_expiry").daterangepicker(
    {
      singleDatePicker: true,
      autoUpdateInput: false,
      showDropdowns: true,
      minDate: moment(),
      maxYear: parseInt(
        moment()
          .add(20, "year")
          .format("YYYY"),
        10
      )
    },
    function(select_date) {
      console.log(this.element.val(select_date.format("DD-MMM-YYYY")));
      M.updateTextFields();
    }
  );
});

$.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
  var start = moment($("#start_date").text(), "DD-MMM-YYYY").format("YYYYMMDD");
  var end = moment($("#end_date").text(), "DD-MMM-YYYY").format("YYYYMMDD");
  var min = parseInt(start, 10);
  var max = parseInt(end, 10);
  var age = parseInt(data[5].substring(0, 8)) || 0;
  if (
    (isNaN(min) && isNaN(max)) ||
    (isNaN(min) && age <= max) ||
    (min <= age && isNaN(max)) ||
    (min <= age && age <= max)
  ) {
    return true;
  }
  return false;
});
