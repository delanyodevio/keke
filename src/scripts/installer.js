let installBtn = document.getElementById("installBtn");
let installAppFlow = document.getElementById("installAppFlow");
let dismissBtn = document.getElementById("dismissBtn");
let installBtnPrime = document.getElementById("installBtnPrime");

installBtn.addEventListener("click", function () {
  installAppFlow.classList.toggle("disabled");
});

dismissBtn.addEventListener("click", function (event) {
  event.stopImmediatePropagation();
  installAppFlow.classList.add("disabled");
});

window.addEventListener("appinstalled", function () {
  installAppFlow.classList.add("disabled");
  installBtn.classList.add("disabled");
});

showInstallPromotion(installBtnPrime);

function showInstallPromotion(element) {
  element.addEventListener("click", function (event) {
    event.stopImmediatePropagation();
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
