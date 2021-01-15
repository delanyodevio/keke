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
const errorMessage = document.getElementById("errorMessage");
const signupButton = document.getElementById("signupButton");

const actionCodeSettings = {
  url: `${window.location.origin}/onboard`,
  handleCodeInApp: true,
};

auth.onAuthStateChanged(function (user) {
  if (user) {
    window.location.assign(`/users/${user.uid}`);
  }
});

signup.addEventListener("submit", function (event) {
  event.preventDefault();

  let email = signup.email.value;

  signupButton.innerHTML = "working...";

  auth
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(function () {
      window.localStorage.setItem("emailForSignIn", email);

      window.location.assign("/pages/success");
    })
    .catch(function () {
      signupButton.innerHTML = "try again";
      errorMessage.classList.remove("disabled");
      errorMessage.innerHTML = `<p>Error processing your form. Please try again.</p>`;

      setTimeout(() => {
        errorMessage.classList.add("disabled");
      }, 5000);
    });
});
