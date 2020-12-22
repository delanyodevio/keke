const homeUrl = document.querySelector("#accountHome");
const fundUrl = document.querySelector("#fundsUrl");
const paymentUrl = document.querySelector("#paymentsUrl");
const settingUrl = document.querySelector("#settingsUrl");
const suggestionUrl = document.querySelector("#suggestionsUrl");

const homeId = document.querySelector("#front");
const fundId = document.querySelector("#fund");
const paymentId = document.querySelector("#payment");
const settingId = document.querySelector("#setting");
const suggestionId = document.querySelector("#suggestions");

const homeHeadline = document.querySelector("#homeHeadline");
const fundHeadline = document.querySelector("#fundHeadline");
const paymentHeadline = document.querySelector("#paymentHeadline");
const supportHeadline = document.querySelector("#supportHeadline");
const settingHeadline = document.querySelector("#settingHeadline");

function visuallyHideElement(element) {
  element.classList.add("visually-hidden");
  element.setAttribute("aria-hidden", "true");
}

function visuallyShowElement(element) {
  element.classList.remove("visually-hidden");
  element.removeAttribute("aria-hidden");
}

homeUrl.addEventListener("click", function () {
  visuallyShowElement(homeId);
  visuallyShowElement(homeHeadline);

  visuallyHideElement(settingId);
  visuallyHideElement(fundId);
  visuallyHideElement(paymentId);
  visuallyHideElement(suggestionId);

  visuallyHideElement(fundHeadline);
  visuallyHideElement(paymentHeadline);
  visuallyHideElement(supportHeadline);
  visuallyHideElement(settingHeadline);
});

fundUrl.addEventListener("click", function () {
  visuallyShowElement(fundId);
  visuallyShowElement(fundHeadline);

  visuallyHideElement(settingId);
  visuallyHideElement(homeId);
  visuallyHideElement(paymentId);
  visuallyHideElement(suggestionId);

  visuallyHideElement(homeHeadline);
  visuallyHideElement(paymentHeadline);
  visuallyHideElement(supportHeadline);
  visuallyHideElement(settingHeadline);
});

paymentUrl.addEventListener("click", function () {
  visuallyShowElement(paymentId);
  visuallyShowElement(paymentHeadline);

  visuallyHideElement(fundId);
  visuallyHideElement(settingId);
  visuallyHideElement(homeId);
  visuallyHideElement(suggestionId);

  visuallyHideElement(fundHeadline);
  visuallyHideElement(homeHeadline);
  visuallyHideElement(supportHeadline);
  visuallyHideElement(settingHeadline);
});

suggestionUrl.addEventListener("click", function () {
  visuallyShowElement(suggestionId);
  visuallyShowElement(supportHeadline);

  visuallyHideElement(settingId);
  visuallyHideElement(fundId);
  visuallyHideElement(paymentId);
  visuallyHideElement(homeId);

  visuallyHideElement(fundHeadline);
  visuallyHideElement(paymentHeadline);
  visuallyHideElement(homeHeadline);
  visuallyHideElement(settingHeadline);
});

settingUrl.addEventListener("click", function () {
  visuallyShowElement(settingId);
  visuallyShowElement(settingHeadline);

  visuallyHideElement(homeId);
  visuallyHideElement(fundId);
  visuallyHideElement(paymentId);
  visuallyHideElement(suggestionId);

  visuallyHideElement(homeHeadline);
  visuallyHideElement(fundHeadline);
  visuallyHideElement(paymentHeadline);
  visuallyHideElement(supportHeadline);
});
