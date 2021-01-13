if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then(function () {});
}

/**
 * let installBtn = document.getElementById("installBtn");
let installAppFlow = document.getElementById("installAppFlow");
let dismissBtn = document.getElementById("dismissBtn");
let installBtnPrime = document.getElementById("installBtnPrime");

let deferredPrompt;

dismissBtn.addEventListener("click", function (event) {
  event.stopPropagation();
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
  element.addEventListener("click", function (event) {
    event.stopPropagation();
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

 */
