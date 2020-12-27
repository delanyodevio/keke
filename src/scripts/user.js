const signupUrl = document.getElementById("signupUrl");
const loginUrl = document.getElementById("loginUrl");
const logoutUrl = document.getElementById("logoutUrl");
const centered = document.querySelector(".centered");

const loadingPage = document.getElementById("loadingPage");
const user = document.getElementById("user");
const userId = user.dataset.userId;

window.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    loadingPage.classList.add("disabled");
    loadingPage.setAttribute("aria-hidden", "true");

    user.classList.remove("visually-hidden");
    user.removeAttribute("aria-hidden");
  }, 10000);
});

auth.onAuthStateChanged((user) => {
  if (user) {
    signupUrl.classList.add("visually-hidden");
    loginUrl.classList.add("visually-hidden");
    logoutUrl.classList.remove("visually-hidden");

    signupUrl.setAttribute("aria-hidden", "true");
    loginUrl.setAttribute("aria-hidden", "true");
    logoutUrl.removeAttribute("arai-hidden");

    let ref = store.collection("users").doc(user.uid);

    ref.onSnapshot(function (doc) {
      console.log("Current data: ", doc.data());

      renderHomePageContents(doc);
    });
  } else {
    signupUrl.classList.remove("visually-hidden");
    loginUrl.classList.remove("visually-hidden");
    logoutUrl.classList.add("visually-hidden");

    signupUrl.removeAttribute("aria-hidden");
    loginUrl.removeAttribute("aria-hidden");
    logoutUrl.setAttribute("arai-hidden", "true");

    window.location.assign("/login");
  }
});

function renderHomePageContents(doc) {
  let displayName = document.getElementById("displayName");

  displayName.innerHTML = doc.data().name;
}

// logging out
logoutUrl.addEventListener("click", function (event) {
  event.preventDefault();

  auth.signOut().then(function () {
    window.location.assign("/");
  });
});
