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

// chart globe
BIZTICLE.initChartGlobe = function () {
  /**
   * ---------------------------------------
   * This demo was created using amCharts 5.
   *
   * For more information visit:
   * https://www.amcharts.com/
   *
   * Documentation is available at:
   * https://www.amcharts.com/docs/v5/
   * ---------------------------------------
   */

  const targetEl = document.querySelector("#chart-globe");

  if (!targetEl) {
    return;
  }

  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  const root = am5.Root.new("chart-globe");

  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([am5themes_Animated.new(root)]);

  // Create the map chart
  // https://www.amcharts.com/docs/v5/charts/map-chart/
  const chart = root.container.children.push(
    am5map.MapChart.new(root, {
      panX: "rotateX",
      panY: "rotateY",
      projection: am5map.geoOrthographic(),
      paddingBottom: 20,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
    })
  );

  // Create main polygon series for countries
  // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
  const polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
    })
  );

  polygonSeries.mapPolygons.template.setAll({
    tooltipText: "{name}",
    toggleKey: "active",
    interactive: true,
  });

  polygonSeries.mapPolygons.template.states.create("hover", {
    fill: root.interfaceColors.get("primaryButtonHover"),
  });

  // Create series for background fill
  // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
  const backgroundSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {})
  );
  backgroundSeries.mapPolygons.template.setAll({
    fill: root.interfaceColors.get("alternativeBackground"),
    fillOpacity: 0.1,
    strokeOpacity: 0,
  });
  backgroundSeries.data.push({
    geometry: am5map.getGeoRectangle(90, 180, -90, -180),
  });

  // Create graticule series
  // https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
  const graticuleSeries = chart.series.push(
    am5map.GraticuleSeries.new(root, {})
  );
  graticuleSeries.mapLines.template.setAll({
    strokeOpacity: 0.1,
    stroke: root.interfaceColors.get("alternativeBackground"),
  });

  // Rotate animation
  chart.animate({
    key: "rotationX",
    from: 0,
    to: 360,
    duration: 30000,
    loops: Infinity,
  });

  // Make stuff animate on load
  chart.appear(1000, 100);
};

// review banner slider
BIZTICLE.reviewBannerSlider = function () {
  $(".review-container").slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
};

// multi-step form
BIZTICLE.multiStepForm = function () {
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
};

// profile
BIZTICLE.initProfile = function () {
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
};

// international telephone input
BIZTICLE.initIntTelInput = function () {
  const input = document.querySelector("#phone");

  if (!input) {
    return;
  }

  window.intlTelInput(input, {
    separateDialCode: true,
    initialCountry: "ca",
    // geoIpLookup: function (callback) {
    //   $.get("https://ipinfo.io", function () {}, "jsonp").always(function (
    //     resp
    //   ) {
    //     var countryCode = resp && resp.country ? resp.country : "";
    //     callback(countryCode);
    //   });
    // },
  });
};

// magnific popup
BIZTICLE.magnificPopup = function () {
  $(".get-started-img-link").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });
};

// init add language
BIZTICLE.addLanguage = function () {
  let languageCounter = 0;

  $("#submitButton").click(function () {
    const selectedText = $("#languageSelect option:selected").text();

    const existingInput = $(".selected-skill-input").filter(function () {
      return $(this).val() === selectedText;
    });

    if (existingInput.length > 0) {
      alert("This language is already added.");
      return;
    }

    $(".selected-language-input").val(selectedText);

    languageCounter++;
    const uniqueId = `language-${languageCounter}`;

    const newLanguageInput = `<div class="language-selection" id="${uniqueId}">
                        <div class="language-type">
                          <div class="form-group">
                            <label class="language-label" for="language"
                              >Language</label
                            >
                            <input
                              type="text"
                              class="form-control selected-skill-input"
                              id="language"
                              value="${selectedText}"
                              placeholder="English (all profiles include this)"
                              required
                              readonly
                            />
                          </div>
                        </div>
                        <div class="proficiency-dropdown">
                          <p class="language-label">Proficiency</p>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Basic</option>
                            <option value="1">Intermediate</option>
                            <option value="2">Advance</option>
                          </select>
                        </div>
                        <!-- X icon for removal -->
                        <div class="remove-language" style="cursor: pointer;">
                         &times;
                        </div>
                      </div>`;

    $(".language-container").append(newLanguageInput);

    $("#languageModal").modal("hide");

    $(".remove-language")
      .last()
      .click(function () {
        $(this).closest(".language-selection").remove();
      });
  });
};

// init add skills
BIZTICLE.addSkills = function () {
  // on enter key press
  $(".skill-input").on("keypress", function (e) {
    if (e.which === 13) {
      const skillText = $(this).val().trim();

      if (!skillText) {
        return;
      }

      // check if there is already a tag with the same text
      // if (
      //   $(".skill-tag-container .tag-container .skill-tag").filter(function () {
      //     return $(this).find(".text").text().trim() === skillText;
      //   }).length > 0
      // ) {
      //   alert("Skill already added!");
      //   return;
      // }

      if (skillText.includes(",")) {
        const skillTags = skillText.split(",").filter((tag) => tag.trim());

        skillTags.forEach((tag) => {
          $(".skill-tag-container .tag-container").addClass("show")
            .append(`<button type="button" class="skill-tag">
            <span class="text">${tag}</span>
            <span class="icon">&times;</span>
            </button>`);
        });

        $(this).val("");
        return;
      }

      $(".skill-tag-container .tag-container").addClass("show")
        .append(`<button type="button" class="skill-tag">
        <span class="text">${skillText}</span>
        <span class="icon">&times;</span>
        </button>`);
      $(this).val("");
    }
  });

  $(".suggested-skill-tag-container").on(
    "click",
    ".suggested-tag",
    function () {
      const tagText = $(this).text().trim().replace(/^\+/, "").trim();
      $(".skill-tag-container .tag-container").addClass("show")
        .append(`<button type="button" class="skill-tag suggested-tag">
      <span class="text">${tagText}</span>
      <span class="icon">&times;</span>
      </button>`);
      $(this).remove();
    }
  );

  $(".skill-tag-container .tag-container").on(
    "click",
    ".skill-tag",
    function () {
      const tagText = $(this).find(".text").text().trim();

      if ($(this).hasClass("suggested-tag")) {
        $(".suggested-skill-tag-container").append(
          `<div class="skill-tag suggested-tag">+ ${tagText}</div>`
        );
      }

      $(this).remove();

      if ($(".skill-tag-container .tag-container .skill-tag").length === 0) {
        $(".skill-tag-container .tag-container").removeClass("show");
      }
    }
  );
};

// init add services
BIZTICLE.addServices = function () {
  $("#selectService").change(function () {
    const selectedServiceText = $("#selectService option:selected").text();

    if (
      $(".service-tag-container .service-tag").filter(function () {
        return $(this).text() === selectedServiceText;
      }).length > 0
    ) {
      alert("Service already added!");
      return;
    }

    const newServiceTag = `
        <div class="skill-tag remove-service-tag">
            ${selectedServiceText}
            <svg
                width="7"
                height="7"
                viewBox="0 0 7 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style="cursor: pointer;"
            >
                <path
                    d="M5.67188 0.807129L0.632812 5.84619"
                    stroke="#535353"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M0.632812 0.807129L5.67188 5.84619"
                    stroke="#535353"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>`;

    $(".service-tag-container").append(newServiceTag);
  });

  $(document).on("click", ".remove-service-tag", function () {
    $(this).closest(".skill-tag").remove();
  });
};

// init resume uploader
BIZTICLE.initResumeUploader = function () {
  if (!$(".resume-file-input").length) {
    return;
  }

  const reader = new FileReader();

  $(".resume-file-input").on("change", function (e) {
    const container = $(this).closest(".resume-uploader");
    const progressContainer = $(container).find(".resume-uploader-progress");
    const files = this.files;
    const file = files[0];

    reader.readAsDataURL(file);

    $(container).find(".resume-uploader-btn").addClass("hide");
    $(progressContainer).addClass("show");

    reader.addEventListener("progress", function (event) {
      if (event.loaded && event.total) {
        const percent = (event.loaded / event.total) * 100;
        $(progressContainer)
          .find(".progress-bar")
          .css("width", percent + "%");

        if (percent === 100) {
          setTimeout(() => {
            $(progressContainer).removeClass("show");
            $(container).find(".resume-uploader-output").addClass("show");
            $(container)
              .find(".resume-uploader-output .file-name")
              .text(file.name);
            $(container).find(".resume-file-input").val("");
          }, 1000);
        }
      }
    });

    $(container).on("click", ".btn", function () {
      $(this).closest(".resume-uploader-output").removeClass("show");
      $(progressContainer).removeClass("show");
      $(container).find(".resume-uploader-btn").removeClass("hide");
      $(progressContainer).find(".progress-bar").css("width", "0%");
    });
  });
};

// init bookmarks active item
BIZTICLE.initBookmarksActive = function () {
  $(".bookmark-container .bookmark-item").click(function () {
    // Remove 'active' class from all items
    $(".bookmark-container .bookmark-item").removeClass("active");

    // Add 'active' class to the clicked item
    $(this).addClass("active");
  });
};

// document ready
document.addEventListener("DOMContentLoaded", function () {
  BIZTICLE.clearAllCategoryFilter();
  BIZTICLE.hideOtherSubCategory();
  BIZTICLE.initChartGlobe();
  BIZTICLE.reviewBannerSlider();
  BIZTICLE.multiStepForm();
  BIZTICLE.initProfile();
  BIZTICLE.initIntTelInput();
  BIZTICLE.magnificPopup();
  BIZTICLE.addLanguage();
  BIZTICLE.addSkills();
  BIZTICLE.initResumeUploader();
  BIZTICLE.addServices();
  BIZTICLE.initBookmarksActive();
});
