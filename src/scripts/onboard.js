const onboardForm = document.getElementById("onboardForm");
const successModal = document.getElementById("successPage");
const signupModal = document.getElementById("signupPage");
const errorMessage = document.getElementById("errorMessage");
const phoneNumberInput = document.getElementById("phone");
const signupButton = document.getElementById("signupButton");

// Confirm the link is a sign-in with email link.
if (auth.isSignInWithEmailLink(window.location.href)) {
  var email = window.localStorage.getItem("emailForSignIn");
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    email = window.prompt(
      "Email not matched, please provide your email for confirmation"
    );
  }

  auth
    .signInWithEmailLink(email, window.location.href)
    .then(function (result) {
      if (result.additionalUserInfo.isNewUser) {
        window.localStorage.setItem("userId", result.user.uid);
        window.localStorage.setItem("userEmail", result.user.email);

        onboardForm.classList.remove("visually-hidden");
        onboardForm.removeAttribute("aria-hidden");

        let emailInput = document.getElementById("email");
        emailInput.value = result.user.email;

        console.log(result.user.uid);
        console.log(result.user.email);
      } else {
        let loginReturnMessage = document.getElementById("loginReturnMessage");
        loginReturnMessage.classList.remove("visually-hidden");
        loginReturnMessage.removeAttribute("aria-hidden");

        onboardForm.classList.add("visually-hidden");
        onboardForm.setAttribute("aria-hidden", "true");
      }
    })
    .catch(function (error) {
      errorMessage.innerHTML = `<p>${error.message}</p>`;
    });
}

phoneNumberInput.addEventListener("input", function () {
  let phoneNumber = phoneNumberInput.value;
  let pad = phoneNumber.startsWith("0") ? phoneNumber.slice(1) : phoneNumber; // 024xxxxxxx -> 24xxxxxxx

  let dialCode = iti.getSelectedCountryData().dialCode; // eg, 233
  let phone = `+${dialCode}${pad}`; // +23324xxxxxxx

  let countryData = iti.getSelectedCountryData().name;
  let country = countryData.endsWith(")")
    ? countryData.substring(countryData.indexOf("("), -1).trim()
    : countryData.trim();

  let countryInput = document.getElementById("country");
  countryInput.value = country;

  window.sessionStorage.setItem("countryStored", country);
  window.sessionStorage.setItem("phoneStored", phone);
});

onboardForm.addEventListener("submit", function (event) {
  event.preventDefault();

  signupButton.innerHTML = "Loading...";

  let fullname = makeSafeText(onboardForm.fullname.value);
  let username = window.localStorage.getItem("userId");
  let email = window.localStorage.getItem("userEmail");
  let phone = window.sessionStorage.getItem("phoneStored");
  let country = window.sessionStorage.getItem("countryStored");

  let data = {
    name: fullname,
    email: email,
    country: country,
    phone: phone,
  };

  let ref = store.collection("users").doc(username);

  ref
    .set(data)
    .then(function () {
      let ref = db.ref("usernames/" + "items");

      let listRef = ref.push();

      listRef.set(username).then(function () {
        onboardForm.reset();
        signupModal.classList.add("visually-hidden");
        successModal.classList.remove("visually-hidden");
      });
    })
    .catch(function (ex) {
      errorMessage.innerHTML = `<p>${ex.message}</p>`;
    });
});

// make a safe text
function makeSafeText(str) {
  const safeText = String(str).replace(/[()$~%.'":*?<>{}]/g, "");
  return safeText;
}
