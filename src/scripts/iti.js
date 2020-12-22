var phoneInput = document.querySelector("#phone");

var iti = window.intlTelInput(phoneInput, {
  onlyCountries: ["gh", "ng"],
  preferredCountries: ["gh", "ng"],
  utilsScript: "/scripts/utils.js",
  autoPlaceholder: "polite",
  nationalMode: true,
  autoHideDialCode: false,
  allowDropdown: true,
  dropdownContainer: null,
});
