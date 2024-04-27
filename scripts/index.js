// navbar sticky

window.onscroll = function () {
  myFunction();
};

var navbar = document.getElementById("navbar");

var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

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

// Clear all checked category filter

document
  .querySelector(".clear-all-btn-category")
  .addEventListener("click", function () {
    var checkboxes = document.querySelectorAll(
      '.category-list input[type="checkbox"]'
    );
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });
  });
