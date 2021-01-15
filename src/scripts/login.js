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

let loginModal = document.getElementById("loginModal");
let loggedModal = document.getElementById("loggedModal");

const login = document.getElementById("loginForm");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");
const loginButton = document.getElementById("loginButton");

const actionCodeSettings = {
  url: "http://localhost:8080/login/onboard/",
  handleCodeInApp: true,
};

auth.onAuthStateChanged(function (user) {
  if (user) {
    loginModal.classList.add("disabled");
    loggedModal.classList.remove("disabled");

    loggedModal.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.assign(`/users/${user.uid}`);
    });
  } else {
    loggedModal.classList.add("disabled");
    loginModal.classList.remove("disabled");
  }
});

login.addEventListener("submit", function (event) {
  event.preventDefault();

  let email = login.email.value;

  loginButton.innerHTML = "working...";

  auth
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(function () {
      window.localStorage.setItem("emailForSignIn", email);

      successMessage.classList.remove("disabled");

      login.classList.add("disabled");
      login.setAttribute("aria-hidden", "true");
    })
    .catch(function () {
      loginButton.innerHTML = "try again";
      errorMessage.classList.remove("disabled");
      errorMessage.innerHTML = `<p>Error processing your form. Please try again.</p>`;

      setTimeout(() => {
        errorMessage.classList.add("disabled");
      }, 5000);
    });
});
