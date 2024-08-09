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

// add language
BIZTICLE.addLanguage = function () {
  const addLanguageBtn = $("#add-language-btn");
  const languageContainer = $(".language-container");
  const languageItem = $(".language-selection");

  addLanguageBtn.click(function () {
    const newLanguageItem = languageItem.clone().removeAttr("style");
    languageContainer.append(newLanguageItem);
  });
};

// add skills
BIZTICLE.addSkills = function () {
  const tagContainer = $(".skill-tag-container .tag-container").first();
  const suggestedContainer = $(".suggested-skill-tag-container");
  const skillInput = $(".skill-input");

  function addTag(tagText, isFromSuggested = false) {
    if (tagText) {
      const newTag = $('<div class="skill-tag"></div>').text(tagText.trim());
      const icon = $(
        '<svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.67188 0.807129L0.632812 5.84619" stroke="#535353" stroke-linecap="round" stroke-linejoin="round"/><path d="M0.632812 0.807129L5.67188 5.84619" stroke="#535353" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      );
      newTag.append(icon);
      tagContainer.append(newTag);
      skillInput.val("");

      icon.click(function () {
        newTag.remove();

        if (isFromSuggested) {
          const suggestedTag = $(
            '<div class="skill-tag suggested-tag"></div>'
          ).text("+ " + tagText);
          suggestedContainer.append(suggestedTag);

          suggestedTag.click(function () {
            const tagText = $(this).text().trim().replace(/^\+/, "").trim();
            addTag(tagText, true);
            $(this).remove();
          });
        }
      });
    }
  }

  skillInput.keypress(function (e) {
    if (e.which === 13) {
      const inputText = skillInput.val();
      const tags = inputText.split(",");
      tags.forEach((tag) => addTag(tag.trim()));
      skillInput.val("");
    }
  });

  $(".suggested-tag").click(function () {
    const tagText = $(this).text().trim().replace(/^\+/, "").trim();
    addTag(tagText, true);
    $(this).remove();
  });
};

// init resume uploader
BIZTICLE.initResumeUploader = function () {
  $("#resume_file").pekeUpload({
    url: "../libs/pekebyte-pekeUpload/upload.php",
    btnText: `<label for="file" class="upload-btn">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1173_57)">
                    <path
                      d="M8.48087 16.9967C6.63545 16.9967 4.79003 16.9967 2.94462 16.9967C1.20858 16.9967 0.00671061 15.8309 0.00201318 14.1457C-0.000671061 13.1628 -0.000671061 12.1804 0.00201318 11.1984C0.00201318 10.7399 0.264393 10.4413 0.650924 10.4433C1.03746 10.4452 1.29716 10.738 1.2985 11.201C1.2985 12.1723 1.2985 13.1443 1.2985 14.1162C1.2985 15.0882 1.9293 15.7169 2.92985 15.7176C6.63143 15.7215 10.3335 15.7215 14.0359 15.7176C15.0808 15.7176 15.6975 15.1046 15.7001 14.0802C15.7001 13.0866 15.7002 12.0931 15.7049 11.0995C15.7049 10.7622 15.9062 10.5212 16.2175 10.4583C16.3496 10.4257 16.4891 10.438 16.613 10.4931C16.7369 10.5482 16.8379 10.6429 16.8993 10.7616C16.964 10.8872 16.9958 11.0264 16.9919 11.167C17 12.1935 17.0011 13.2196 16.9953 14.2453C16.9832 15.7883 15.7639 16.9856 14.1842 16.9961C12.2844 17.0046 10.3833 16.9974 8.48087 16.9967Z"
                      fill="#469C98"
                    />
                    <path
                      d="M7.84636 2.15678C7.41151 2.57791 7.05047 2.9257 6.69146 3.2761C6.16132 3.79286 5.63454 4.31289 5.10239 4.82703C4.87221 5.04906 4.59909 5.11193 4.30584 4.96129C4.05419 4.8303 3.92602 4.61024 3.97836 4.33581C4.00915 4.18775 4.08273 4.05138 4.19041 3.94284C5.45693 2.69406 6.72859 1.44965 8.0054 0.2096C8.30067 -0.0772702 8.65901 -0.0779251 8.95427 0.2096C10.2306 1.44877 11.5034 2.69144 12.7726 3.9376C13.0618 4.2212 13.0672 4.58601 12.8109 4.84275C12.5424 5.11062 12.1606 5.11324 11.856 4.82048C11.0433 4.03977 10.2407 3.24859 9.43408 2.46264C9.35758 2.38929 9.2784 2.31855 9.13211 2.18298V2.68074C9.13211 5.83588 9.13211 8.99101 9.13211 12.1461C9.13928 12.3194 9.11123 12.4924 9.04957 12.655C8.93012 12.9262 8.68048 13.033 8.38656 12.9878C8.2511 12.974 8.12477 12.9146 8.02926 12.8198C7.93376 12.7251 7.87502 12.6008 7.86314 12.4684C7.84847 12.3272 7.8442 12.1851 7.85038 12.0433C7.85038 8.89954 7.85038 5.75575 7.85038 2.61197L7.84636 2.15678Z"
                      fill="#469C98"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1173_57">
                      <rect width="17" height="17" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Upload your LinkedIn PDF
              </label>`,
    allowedExtensions: "pdf",
    invalidExtError: "Invalid file type. Only PDF files are allowed.",
    maxSize: "10M",
    sizeError: "File size is too large. Maximum size is 10MB.",
    limit: 1,
    limitError: "You can only upload one file.",
    onFileSuccess: function (file) {
      alert("File uploaded successfully: " + file.name);
    },
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
});
