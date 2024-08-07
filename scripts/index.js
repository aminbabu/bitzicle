// global object
const BIZTICLE = {};

// clear all checked category filter
BIZTICLE.clearAllCategoryFilter = function () {
  const triggerButtons = Array.from(
    document.querySelectorAll(".clear-all-btn-price")
  );

  // check if triggerButtons is empty
  if (!triggerButtons.length) {
    return;
  }

  triggerButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const radioButtons = Array.from(
        document.querySelectorAll('.radio-list input[type="radio"]')
      );

      radioButtons.forEach((radioButton) => {
        radioButton.checked = false;
      });
    });
  });
};

// hide other sub-category when one is open
BIZTICLE.hideOtherSubCategory = function () {
  // Get all category items
  const categoryItems = document.querySelectorAll(".cateogory-item");

  // Check if categoryItems is empty
  if (!categoryItems.length) {
    return;
  }

  // Iterate through each category item
  categoryItems.forEach(function (item) {
    // Add click event listener to category item's link
    item
      .querySelector(".category-item-content")
      .addEventListener("click", function () {
        // Get the collapse element associated with this category item
        const collapse = item.querySelector(".collapse");

        // Close all collapse elements except this one
        document.querySelectorAll(".collapse").forEach(function (c) {
          if (c !== collapse) {
            c.classList.remove("show");
          }
        });
      });
  });
};

// document ready
document.addEventListener("DOMContentLoaded", function () {
  BIZTICLE.clearAllCategoryFilter();
  BIZTICLE.hideOtherSubCategory();
});

// Multi step form
$(document).ready(function () {
  var currentStep = 0;
  var steps = $(".step");
  var progressBar = $("#progressBar");

  $(".next-btn").click(function () {
    if (currentStep < steps.length - 1) {
      $(steps[currentStep]).removeClass("active");
      currentStep++;
      $(steps[currentStep]).addClass("active");
      updateProgressBar();
    }
  });

  $(".skip-btn").click(function () {
    if (currentStep < steps.length - 1) {
      $(steps[currentStep]).removeClass("active");
      currentStep++;
      $(steps[currentStep]).addClass("active");
      updateProgressBar();
    }
  });

  $(".prev-btn").click(function () {
    if (currentStep > 0) {
      $(steps[currentStep]).removeClass("active");
      currentStep--;
      $(steps[currentStep]).addClass("active");
      updateProgressBar();
    }
  });

  $("#multiStepForm").submit(function (event) {
    event.preventDefault();
    alert("Form submitted!");
  });

  function updateProgressBar() {
    var progress = ((currentStep + 1) / steps.length) * 100;
    progressBar.css("width", progress + "%");
  }
});

// profile
$(document).ready(function () {
  var readURL = function (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $(".profile-pic").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  $(".file-upload").on("change", function () {
    readURL(this);
  });

  $(".upload-button").on("click", function () {
    $(".file-upload").click();
  });
});

// Country Code Selection
$(document).ready(function () {
  var input = document.querySelector("#phone");
  window.intlTelInput(input, {
    separateDialCode: true,
    initialCountry: "ca",
    geoIpLookup: function (callback) {
      $.get("https://ipinfo.io", function () {}, "jsonp").always(function (
        resp
      ) {
        var countryCode = resp && resp.country ? resp.country : "";
        callback(countryCode);
      });
    },
    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@23.8.0/build/js/utils.js",
  });
});

// resume upload
function _(el) {
  return document.getElementById(el);
}

function uploadFile() {
  var file = _("resume_file").files[0];
  // alert(file.name+" | "+file.size+" | "+file.type);
  var formdata = new FormData();
  formdata.append("resume_file", file);
  var ajax = new XMLHttpRequest();
  ajax.upload.addEventListener("progress", progressHandler, false);
  ajax.addEventListener("load", completeHandler, false);
  ajax.addEventListener("error", errorHandler, false);
  ajax.addEventListener("abort", abortHandler, false);
  ajax.open("POST", "file_upload_parser.php");
  ajax.send(formdata);
}

function progressHandler(event) {
  _("loaded_n_total").innerHTML =
    "Uploaded " + event.loaded + " bytes of " + event.total;
  var percent = (event.loaded / event.total) * 100;
  _("resumeProgressBar").value = Math.round(percent);
  _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
}

function completeHandler(event) {
  _("status").innerHTML = event.target.responseText;
  // _("resumeProgressBar").value = 0;
  //wil clear progress bar after successful upload
}

function errorHandler(event) {
  _("status").innerHTML = "Upload Failed";
}

function abortHandler(event) {
  _("status").innerHTML = "Upload Aborted";
}

// magnific popup
$(document).ready(function () {
  $(".get-started-img-link").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false,
  });
});

// add language
$(document).ready(function () {
  const addLanguageBtn = $("#add-language-btn");
  const languageContainer = $(".language-container");
  const languageItem = $(".language-selection");

  addLanguageBtn.click(function () {
    const newLanguageItem = languageItem.clone().removeAttr("style");
    languageContainer.append(newLanguageItem);
  });
});
