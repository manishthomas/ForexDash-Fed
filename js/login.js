$(function() {
  $("select").formSelect();

  /***** # login Form Submission # ****/
  $("#login_form").submit(function(e) {
    e.preventDefault();
    var $inputs = $("#login_form :input").not(":input[type=submit]"),
      setFocus = true,
      formSuccess = 0;
    $inputs.each(function() {
      if (!$(this).val()) {
        $(this).addClass("invalid");
        if (setFocus) {
          $(this).focus();
          setFocus = false;
        }
      } else {
        $(this)
          .removeClass("invalid")
          .addClass("valid");
        formSuccess++;
      }
    });

    if (formSuccess === $inputs.length) {
      /** Call form Submission */
      console.log("success");
      //** on success */
      show.listPage();
      //** show DataTable */
      new InitDataTable();
    }
  });

  $("#login_form :input")
    .not(":input[type=submit]")
    .bind("keyup focusout", function() {
      if (!$(this).val()) {
        $(this).addClass("invalid");
      } else {
        $(this)
          .removeClass("invalid")
          .addClass("valid");
      }
    });
});
