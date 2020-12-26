var config = {
  apiKey: "AIzaSyA1-tpaL4igS3Zh6plENikTDWoOpRBCXxg",
  authDomain: "keke-money.firebaseapp.com",
  databaseURL: "https://keke-money-default-rtdb.firebaseio.com",
  projectId: "keke-money",
  storageBucket: "keke-money.appspot.com",
  messagingSenderId: "422810837575",
  appId: "1:422810837575:web:91561fd1e03b34a87d0762",
};
// Initialize Firebase
var project = firebase.initializeApp(config);

// reference firebase services
const auth = project.auth();

const login = document.getElementById("loginForm");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");
const loginButton = document.getElementById("loginButton");

const actionCodeSettings = {
  url: "http://localhost:8080/login/onboard/",
  handleCodeInApp: true,
};

login.addEventListener("submit", function (event) {
  event.preventDefault();

  let email = login.email.value;

  loginButton.innerHTML = "Loading...";

  auth
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(function () {
      window.localStorage.setItem("emailForSignIn", email);

      successMessage.removeAttribute("aria-hidden");
      successMessage.classList.remove("visually-hidden");

      login.classList.add("visually-hidden");
      login.setAttribute("aria-hidden", "true");
    })
    .catch(function (error) {
      errorMessage.innerHTML = `<p>${error.message}</p>`;
      errorMessage.classList.remove("visually-hidden");
      errorMessage.removeAttribute("aria-hidden");
    });
});
