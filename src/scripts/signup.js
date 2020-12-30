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

const signup = document.getElementById("signupForm");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");
const signupButton = document.getElementById("signupButton");

const actionCodeSettings = {
  url: "http://localhost:8080/onboard/",
  handleCodeInApp: true,
};

signup.addEventListener("submit", function (event) {
  event.preventDefault();

  let email = signup.email.value;

  signupButton.innerHTML = "Loading...";

  auth
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(function () {
      window.localStorage.setItem("emailForSignIn", email);

      successMessage.classList.remove("disabled");

      signup.classList.add("disabled");
    })
    .catch(function (error) {
      errorMessage.innerHTML = `<p>${error.message}</p>`;
      errorMessage.classList.remove("disabled");
    });
});
