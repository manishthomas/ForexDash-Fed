var show = {
  loginPage: function() {
    $(".page").fadeOut();
    $("#login_section").fadeIn();
  },
  listPage: function() {
    $(".page").fadeOut();
    $("#list_section").fadeIn();
  },
  detailsPage: function() {
    $(".page").fadeOut();
    $("#details_section").fadeIn();
  }
};

// For Test Page show
// show.detailsPage();
$(".page").hide();
$("#login_section").fadeIn();
$("#list_section").fadeIn();
$("#details_section").show();

/** Modal DOM Changes and validation */
$("#passport_check").change(function() {
  if ($(this).is(":checked")) {
    $(".passport_upload_btns").hide();
    $(".passport_verified_btns").show();
  } else {
    $(".passport_verified_btns").hide();
    $(".passport_upload_btns").show();
  }
});

$("#passport_upload_btn").click(function() {
  // Block
  $("#passport_show_block").hide();
  $("#passport_upload_block").show();
  // button
  $("#passport_old_btn").show();
  $("#passport_upload_btn").hide();
});

$("#passport_old_btn").click(function() {
  // Block
  $("#passport_upload_block").hide();
  $("#passport_show_block").show();
  // button
  $("#passport_upload_btn").show();
  $("#passport_old_btn").hide();
});

$("#passport_verified_btn").click(function() {
  var $passport_expiry = $("#passport_expiry");
  if (!$passport_expiry.val()) $passport_expiry.addClass("invalid");
  else {
    // Passport Image Submitted
  }
});

/*** VISA/Ticket */
$("#visa_check").change(function() {
  if ($(this).is(":checked")) {
    $(".visa_upload_btns").hide();
    $(".visa_verified_btns").show();
  } else {
    $(".visa_verified_btns").hide();
    $(".visa_upload_btns").show();
  }
});

$("#visa_upload_btn").click(function() {
  // Block
  $("#visa_show_block").hide();
  $("#visa_upload_block").show();
  // button
  $("#visa_old_btn").show();
  $("#visa_upload_btn").hide();
});

$("#visa_old_btn").click(function() {
  // Block
  $("#visa_upload_block").hide();
  $("#visa_show_block").show();
  // button
  $("#visa_upload_btn").show();
  $("#visa_old_btn").hide();
});

$("#visa_verified_btn").click(function() {
  if (!$("#extra_doctype_sel").val())
    $("#visa_modal .select-wrapper").addClass("invalid");
  else $("#visa_modal .select-wrapper").removeClass("invalid");
});

$("#extra_doctype_sel").change(function() {
  if ($(this).val()) $("#visa_modal .select-wrapper").removeClass("invalid");
});

/*** Approve Modal */
$("#approve_request_btn").click(function() {
  var $umrn_no = $("#umrn_no");
  if (!$umrn_no.val()) $umrn_no.addClass("invalid");
});

// $(
//   "#lrs_verified,#rate_verified,#docs_verified,#personal_details_verified"
// ).change(function() {
//   if ($(this).is(":checked")) {
//     $(".visa_upload_btns").hide();
//     $(".visa_verified_btns").show();
//   } else {
//     $(".visa_verified_btns").hide();
//     $(".visa_upload_btns").show();
//   }
// });

$(".card-action").on("change", ":checkbox", function() {
  if (this.id == "lrs_verified" && this.checked) {
    if (!$("#lrs_limit").val()) {
      $("#lrs_limit").addClass("invalid");
      $(this).prop("checked", false);
    }
  }
  var checkedNum = $('.card-action input[type="checkbox"]:checked').length;
  // TODO also check the passport and visa doc in final
  if (checkedNum == 4) {
    $("#approve_btn")
      .prop("disabled", false)
      .removeClass("disabled");
    $("#reject_btn")
      .prop("disabled", true)
      .addClass("disabled");
  } else {
    $("#approve_btn")
      .prop("disabled", true)
      .addClass("disabled");
    $("#reject_btn")
      .prop("disabled", false)
      .removeClass("disabled");
  }
});
