var phoneInput = document.querySelector("#phone");

var iti = window.intlTelInput(phoneInput, {
  onlyCountries: ["gh"],
  utilsScript: "/scripts/utils.js",
  autoPlaceholder: "polite",
  nationalMode: true,
  autoHideDialCode: false,
  allowDropdown: true,
  dropdownContainer: null,
});
