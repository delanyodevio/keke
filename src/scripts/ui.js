// Toggles between the loading... interface and the content
// rendering interface.
let loadingPage = document.getElementById("loadingPage");
let userPage = document.getElementById("userPage");
window.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    loadingPage.classList.add("disabled");

    userPage.classList.remove("disabled");
  }, 7000);
});

// Opens the fund form
let cancelFundButton = document.getElementById("cancelFundButton");
let addFundLink = document.getElementById("addFundLink");

addFundLink.addEventListener("click", function (event) {
  event.preventDefault();

  createFundButton.innerHTML = "create";
  cancelFundButton.innerHTML = "cancel";
  addFundSuccess.classList.add("disabled");

  let addFundError = document.getElementById("addFundError");
  addFundError.classList.add("disabled");

  createFundForm.classList.toggle("disabled");
});

// Cancels the add fun operation
cancelFundButton.addEventListener("click", function (event) {
  event.stopPropagation();

  createFundButton.innerHTML = "create";

  cancelFundButton.innerHTML = "working...";
  createFundForm.reset();
  window.localStorage.removeItem("endingDate");

  setTimeout(function () {
    createFundForm.classList.add("disabled");
  }, 3000);
});

const depositLink = document.getElementById("depositLink");
let cancelDeposit = document.getElementById("cancelDeposit");

depositLink.addEventListener("click", function (event) {
  event.preventDefault();

  cancelDeposit.innerHTML = "cancel";
  let depositSuccess = document.getElementById("depositSuccess");
  depositSuccess.classList.add("disabled");
  depositForm.classList.toggle("disabled");
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

cashoutLink.addEventListener("click", function (event) {
  event.preventDefault();

  cancelCashout.innerHTML = "cancel";
  let cashoutSuccess = document.getElementById("cashoutSuccess");
  let cashoutError = document.getElementById("cashoutError");
  let cashoutBtn = document.getElementById("cashoutBtn");
  let cashoutLock = document.getElementById("cashoutLock");

  cashoutBtn.innerHTML = "cashout";
  cashoutSuccess.classList.add("disabled");
  cashoutError.classList.add("disabled");
  cashoutForm.classList.toggle("disabled");
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
  let month = today.toLocaleString("default", { month: "short" });
  let day = today.getDate();
  let lockYears = lockYearsInput.value;
  let endYear = parseInt(lockYears) + parseInt(year);

  createdAtInput.value = `Today, ${day} ${month} ${year}`;

  if (!isNaN(endYear)) {
    endsAtInput.value = `${day} ${month} ${endYear}`;
    window.localStorage.setItem(
      "endingDate",
      `${endYear}, ${today.getMonth()}, ${day}`
    );
  } else if (endYear == parseInt(year)) {
    endsAtInput.value = `Toady, ${day} ${month} ${year}`;
  } else {
    endsAtInput.value = `Toady, ${day} ${month} ${year}`;
  }
});
