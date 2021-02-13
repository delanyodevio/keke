if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then(function () {});
}

let deferredPrompt;

window.addEventListener("beforeinstallpromt", function (event) {
  event.preventDefault();
  deferredPrompt = event;
});
