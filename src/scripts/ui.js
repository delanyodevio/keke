const fundUrl = document.querySelector("#fundsUrl");
const paymentUrl = document.querySelector("#paymentsUrl");
const settingUrl = document.querySelector("#settingsUrl");
const suggestionUrl = document.querySelector("#suggestionsUrl");

const fundId = document.querySelector("#fund");
const paymentId = document.querySelector("#payment");
const settingId = document.querySelector("#setting");
const suggestionId = document.querySelector("#suggestions");

const fundHeadline = document.querySelector("#fundHeadline");
const paymentHeadline = document.querySelector("#paymentHeadline");
const supportHeadline = document.querySelector("#supportHeadline");
const settingHeadline = document.querySelector("#settingHeadline");

function visuallyHideElement(element) {
  element.classList.add("disabled");
}

function visuallyShowElement(element) {
  element.classList.remove("disabled");
}

fundUrl.addEventListener("click", function () {
  visuallyShowElement(fundId);
  visuallyShowElement(fundHeadline);

  visuallyHideElement(settingId);
  visuallyHideElement(paymentId);
  visuallyHideElement(suggestionId);

  visuallyHideElement(paymentHeadline);
  visuallyHideElement(supportHeadline);
  visuallyHideElement(settingHeadline);
});

paymentUrl.addEventListener("click", function () {
  visuallyShowElement(paymentId);
  visuallyShowElement(paymentHeadline);

  visuallyHideElement(fundId);
  visuallyHideElement(settingId);
  visuallyHideElement(suggestionId);

  visuallyHideElement(fundHeadline);
  visuallyHideElement(supportHeadline);
  visuallyHideElement(settingHeadline);
});

suggestionUrl.addEventListener("click", function () {
  visuallyShowElement(suggestionId);
  visuallyShowElement(supportHeadline);

  visuallyHideElement(settingId);
  visuallyHideElement(fundId);
  visuallyHideElement(paymentId);

  visuallyHideElement(fundHeadline);
  visuallyHideElement(paymentHeadline);
  visuallyHideElement(settingHeadline);
});

settingUrl.addEventListener("click", function () {
  visuallyShowElement(settingId);
  visuallyShowElement(settingHeadline);

  visuallyHideElement(fundId);
  visuallyHideElement(paymentId);
  visuallyHideElement(suggestionId);

  visuallyHideElement(fundHeadline);
  visuallyHideElement(paymentHeadline);
  visuallyHideElement(supportHeadline);
});

// Opens the fund form
let cancelFundButton = document.getElementById("cancelFundButton");
let addFundLink = document.getElementById("addFundLink");

addFundLink.addEventListener("click", function () {
  cancelFundButton.innerHTML = "cancel";
  let addFundSuccess = document.getElementById("addFundSuccess");
  addFundSuccess.classList.add("disabled");
  createFundForm.classList.remove("disabled");
});

// Cancels the add fun operation
cancelFundButton.addEventListener("click", function (event) {
  event.stopPropagation();

  cancelFundButton.innerHTML = "working...";
  createFundForm.reset();
  window.localStorage.removeItem("endingDate");

  setTimeout(function () {
    createFundForm.classList.add("disabled");
  }, 3000);
});

const depositLink = document.getElementById("depositLink");
let cancelDeposit = document.getElementById("cancelDeposit");

depositLink.addEventListener("click", function () {
  cancelDeposit.innerHTML = "cancel";
  let depositSuccess = document.getElementById("depositSuccess");
  depositSuccess.classList.add("disabled");
  depositForm.classList.remove("disabled");
});

cancelDeposit.addEventListener("click", function (event) {
  event.stopPropagation();

  cancelDeposit.innerHTML = "working...";
  depositForm.reset();

  setTimeout(function () {
    depositForm.classList.add("disabled");
  }, 3000);
});

let cashoutLink = document.getElementById("cashoutLink");
let cancelCashout = document.getElementById("cancelCashout");

cashoutLink.addEventListener("click", function () {
  cancelCashout.innerHTML = "cancel";
  let cashoutSuccess = document.getElementById("cashoutSuccess");
  let cashoutError = document.getElementById("cashoutError");
  let cashoutBtn = document.getElementById("cashoutBtn");
  let cashoutLock = document.getElementById("cashoutLock");

  cashoutBtn.innerHTML = "cashout";
  cashoutSuccess.classList.add("disabled");
  cashoutError.classList.add("disabled");
  cashoutForm.classList.remove("disabled");
});

cancelCashout.addEventListener("click", function (event) {
  event.stopPropagation();

  cancelCashout.innerHTML = "working...";
  cashoutForm.reset();

  setTimeout(function () {
    cashoutForm.classList.add("disabled");
  }, 3000);
});

/**
 * Listen to lockYears input field, takes the value
 * and determines the ending date
 * Eg, lockYears = 5
 * endingYear = lockYears + today.getFullYear().
 * Then populates the values into the input field.
 */
let endsAtInput = document.getElementById("endsAt");
let createdAtInput = document.getElementById("createdAt");
let lockYearsInput = document.getElementById("lockYears");
lockYearsInput.addEventListener("input", function () {
  let today = new Date(Date.now());
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let lockYears = lockYearsInput.value;
  let endYear = parseInt(lockYears) + parseInt(year);

  createdAtInput.value = `Today, ${day}/${month}/${year}`;

  if (!isNaN(endYear)) {
    endsAtInput.value = `${day}/${month}/${endYear}`;
    window.localStorage.setItem("endingDate", `${endYear}, ${month}, ${day}`);
  } else if (endYear == parseInt(year)) {
    endsAtInput.value = `Toady, ${day}/${month}/${year}`;
  } else {
    endsAtInput.value = `Toady, ${day}/${month}/${year}`;
  }
});

// Toggles between the loading... interface and the content
// rendering interface.
let loadingPage = document.getElementById("loadingPage");
let userPage = document.getElementById("userPage");
window.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    loadingPage.classList.add("disabled");

    userPage.classList.remove("disabled");
  }, 10000);
});
