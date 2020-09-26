/**
 * DataTable Filters
 */
$(function() {
  $("#filter_btns .btn").click(function() {
    $("#filter_btns .btn").removeClass("active");
    $(this).addClass("active");

    /** Filtering with Application Status Datatable */
    if (this.id != "all_btn") {
      $dataTable
        .DataTable()
        .column(6)
        .search(this.text, false, true)
        .draw();
    } else {
      $dataTable
        .DataTable()
        .column(6)
        .search("")
        .draw();
    }
  });
});
