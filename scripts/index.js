// global object
const BIZTICLE = {};

// clear all checked category filter
BIZTICLE.clearAllCategoryFilter = function () {
  const triggerButtons = Array.from(document.querySelectorAll(".clear-all-btn-price"));

  // check if triggerButtons is empty
  if (!triggerButtons.length) {
    return;
  }

  triggerButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const radioButtons = Array.from(document.querySelectorAll('.radio-list input[type="radio"]'));

      radioButtons.forEach((radioButton) => {
        radioButton.checked = false;
      });
    });
  }
  );
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