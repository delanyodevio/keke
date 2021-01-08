if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then(function () {
    console.log("service worker registered");
  });
}

const installBtn = document.getElementById("installBtn");
const installAppFlow = document.getElementById("installAppFlow");
const notNowBtn = document.getElementById("notNowBtn");
const installBtnPrime = document.getElementById("installBtnPrime");

let deferredPrompt;

notNowBtn.addEventListener("click", function () {
  installAppFlow.classList.add("disabled");
  installBtn.classList.remove("disabled");
});

window.addEventListener("beforeinstallpromt", function (event) {
  event.preventDefault();
  deferredPrompt = event;
});

window.addEventListener("appinstalled", function () {
  installAppFlow.classList.add("disabled");
  installBtn.classList.add("disabled");
});

showInstallPromotion(installBtn);
showInstallPromotion(installBtnPrime);

function showInstallPromotion(element) {
  element.addEventListener("click", function () {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        installAppFlow.classList.add("disabled");
        installBtn.classList.add("disabled");
      } else {
        installAppFlow.classList.add("disabled");
        installBtn.classList.remove("disabled");
      }
    });
  });
}
