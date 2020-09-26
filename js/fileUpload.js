/*** Passport */
var Dropzone_Passport = {
  paramName: "passport_img",
  maxFiles: 1,
  url: "FileUpload",
  timeout: 30000,
  method: "post",
  thumbnailWidth: 180,
  thumbnailHeight: 180,
  uploadMultiple: false,
  ignoreHiddenFiles: false,
  acceptedFiles: ".jpg,.png",
  addRemoveLinks: true,
  dictDefaultMessage:
    '<img src="img/icons/upload.svg" class="calender-i" /> <br>Drop files here or click to upload.',
  init: function() {
    this.on("addedfile", function(file, xhr, formData) {
      // Hookup the start button
      console.log("file added");
      // Create the remove element
      var uploadPercent = Dropzone.createElement(
        "<p class='uploadPercent'></p>"
      ); // Add the element to the file preview element.
      file.previewElement.appendChild(uploadPercent);
    });
    this.on("sending", function(file, xhr, formData) {
      // Will send the filesize along with the file as POST data.
      // Show the total progress bar when upload starts
      formData.append("doc_typ", "passport");
    });
    this.on("complete", function(file) {
      console.log("complete file.");
    });
    this.on("success", function(file, serverResponse) {
      // Called after the file successfully uploaded.
      console.log(serverResponse);
      if (serverResponse == "1")
        Materialize.toast("File Uploaded!", 3000, "green darken-2 rounded");
      else alert("File not correct...!!");
    });
    this.on("error", function(file, errormessage, xhr) {
      alert(errormessage);
      Materialize.toast(errormessage, 3000, "rounded");
      //console.log(xhr);
    });
    this.on("totaluploadprogress", function(
      totalPercentage,
      totalBytesToBeSent,
      totalBytesSent
    ) {
      // Update the total progress bar
      console.log(totalPercentage + "%");
      $(".uploadPercent").html(Math.round(totalPercentage) + "%");
      if (totalPercentage >= 100 && totalBytesSent) {
        // All done! Call func here
        $(".uploadPercent").html("Uploaded");
      }
    });
    this.on("maxfilesreached", function() {
      $(".dropzone").removeClass("dz-clickable"); // remove cursor
      $(".dropzone")[0].removeEventListener(
        "click",
        this.listeners[1].events.click
      );
    });
  },
  removedfile: function(file) {
    var name = file.name;
    $.ajax({
      type: "POST",
      url: "delete.php",
      data: "id=" + name,
      dataType: "html"
    });
    var _ref;
    return (_ref = file.previewElement) != null
      ? _ref.parentNode.removeChild(file.previewElement)
      : void 0;
  }
};
Dropzone.options.passportFront = Dropzone_Passport;
Dropzone.options.passportFront.paramName = "passport_front";
Dropzone.options.passportBack = Dropzone_Passport;
Dropzone.options.passportBack.paramName = "passport_back";

/*** Dropzone Visa*/
Dropzone.options.uploadVisa = {
  paramName: "visa_img",
  maxFiles: 1,
  url: "FileUpload",
  timeout: 30000,
  method: "post",
  thumbnailWidth: 180,
  thumbnailHeight: 180,
  uploadMultiple: false,
  ignoreHiddenFiles: false,
  acceptedFiles: ".jpg,.png",
  addRemoveLinks: true,
  dictDefaultMessage:
    '<img src="img/icons/upload.svg" class="calender-i" /> <br>Drop files here or click to upload.',
  init: function() {
    this.on("addedfile", function(file, xhr, formData) {
      // Hookup the start button
      console.log("file added");
      // Create the remove element
      var uploadPercent = Dropzone.createElement(
        "<p class='uploadPercent'></p>"
      ); // Add the element to the file preview element.
      file.previewElement.appendChild(uploadPercent);
    });
    this.on("sending", function(file, xhr, formData) {
      // Will send the filesize along with the file as POST data.
      // Show the total progress bar when upload starts
      formData.append("doc_typ", "visa");
    });
    this.on("complete", function(file) {
      console.log("complete file.");
    });
    this.on("success", function(file, serverResponse) {
      // Called after the file successfully uploaded.
      console.log(serverResponse);
      if (serverResponse == "1")
        Materialize.toast("File Uploaded!", 3000, "green darken-2 rounded");
      else alert("File not correct...!!");
    });
    this.on("error", function(file, errormessage, xhr) {
      alert(errormessage);
      Materialize.toast(errormessage, 3000, "rounded");
      //console.log(xhr);
    });
    this.on("totaluploadprogress", function(
      totalPercentage,
      totalBytesToBeSent,
      totalBytesSent
    ) {
      // Update the total progress bar
      console.log(totalPercentage + "%");
      $(".uploadPercent").html(Math.round(totalPercentage) + "%");
      if (totalPercentage >= 100 && totalBytesSent) {
        // All done! Call func here
        $(".uploadPercent").html("Uploaded");
      }
    });
    this.on("maxfilesreached", function() {
      $(".dropzone").removeClass("dz-clickable"); // remove cursor
      $(".dropzone")[0].removeEventListener(
        "click",
        this.listeners[1].events.click
      );
    });
  },
  removedfile: function(file) {
    var name = file.name;
    $.ajax({
      type: "POST",
      url: "delete.php",
      data: "id=" + name,
      dataType: "html"
    });
    var _ref;
    return (_ref = file.previewElement) != null
      ? _ref.parentNode.removeChild(file.previewElement)
      : void 0;
  }
};
