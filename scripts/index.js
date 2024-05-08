// Clear all checked price filter

document
  .querySelector(".clear-all-btn-price")
  .addEventListener("click", function () {
    var radioButtons = document.querySelectorAll(
      '.radio-list input[type="radio"]'
    );
    radioButtons.forEach(function (radioButton) {
      radioButton.checked = false;
    });
  });

// hide other sub-category when one is open

document.addEventListener("DOMContentLoaded", function () {
  // Get all category items
  const categoryItems = document.querySelectorAll(".cateogory-item");

  // Iterate through each category item
  categoryItems.forEach(function (item) {
    // Add click event listener to category item's link
    item
      .querySelector(".category-item-content")
      .addEventListener("click", function () {
        // Get the collapse element associated with this category item
        const collapse = item.querySelector(".collapse");
        console.log(collapse);

        // Close all collapse elements except this one
        document.querySelectorAll(".collapse").forEach(function (c) {
          if (c !== collapse) {
            c.classList.remove("show");
          }
        });
      });
  });
});
