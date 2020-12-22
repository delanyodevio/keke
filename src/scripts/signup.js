// Get the form
const signup = document.getElementById("signupForm");
const phoneVerificationForm = document.getElementById("phoneVerificationForm");
const phoneCodeForm = document.getElementById("phoneCodeForm");
const successModal = document.getElementById("successPage");
const signupModal = document.getElementById("signupPage");
const singInButton = document.getElementById("singInButton");
const phoneCodeButton = document.getElementById("phoneCodeButton");
const signupButton = document.getElementById("signupButton");

// Globally create a recaptcha verifier instance
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("singInButton", {
  size: "invisible",
  callback: function (response) {
    onSignInSubmit();
  },
});

// Takes the phone value and send code to the number
phoneVerificationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  singInButton.style.backgroundColor = "#f0eeea";
  singInButton.innerHTML = '<div class="spinner"><div></div><div></div></div>';

  let phoneNumber = phoneVerificationForm.phone.value; // eg, 024xxxxxxx
  let unique = phoneNumber.startsWith("0") ? phoneNumber.slice(1) : phoneNumber; // 024xxxxxxx -> 24xxxxxxx
  let dialCode = iti.getSelectedCountryData().dialCode; // eg, 233
  let phone = `+${dialCode}${unique}`; // +23324xxxxxxx
  let countryData = iti.getSelectedCountryData().name;
  let country = countryData.endsWith(")")
    ? countryData.substring(countryData.indexOf("("), -1).trim()
    : countryData.trim();
  let countryInput = document.getElementById("country");
  countryInput.value = country;

  let verifier = window.recaptchaVerifier;

  auth
    .signInWithPhoneNumber(phone, verifier)
    .then(function (confirmationResult) {
      window.confirmationResult = confirmationResult;

      // save to sessionStorage
      window.sessionStorage.setItem("storedPhone", phone);
      window.sessionStorage.setItem("storedCountry", country);
      window.sessionStorage.setItem("storedUnique", unique);

      phoneVerificationForm.classList.add("visually-hidden");
      phoneVerificationForm.setAttribute("aria-hidden", "true");

      phoneCodeForm.classList.remove("visually-hidden");
      phoneCodeForm.removeAttribute("aria-hidden");
    })
    .catch(function (ex) {
      console.log(ex);
    });
});

// Takes the code and verify the user accordingly
phoneCodeForm.addEventListener("submit", function (event) {
  event.preventDefault();

  phoneCodeButton.style.backgroundColor = "#f0eeea";
  phoneCodeButton.innerHTML =
    '<div class="spinner"><div></div><div></div></div>';

  let code = phoneCodeForm.phoneCode.value;
  let successMessage = document.querySelector(".successMessage");

  confirmationResult
    .confirm(code)
    .then(function (result) {
      let user = result.user;
      console.log(user);

      phoneCodeForm.classList.add("visually-hidden");
      phoneCodeForm.setAttribute("aria-hidden", "true");

      successMessage.classList.remove("visually-hidden");
      successMessage.removeAttribute("aria-hidden");

      signup.classList.remove("visually-hidden");
      signup.removeAttribute("aria-hidden");
    })
    .catch(function (ex) {
      console.log(ex);
    });
});

signup.addEventListener("submit", function (event) {
  event.preventDefault();

  signupButton.style.backgroundColor = "#f0eeea";
  signupButton.innerHTML = '<div class="spinner"><div></div><div></div></div>';

  let fullname = makeSafeText(signup.fullname.value);
  let mail = signup.email.value;
  let password = signup.password.value;
  let phone = window.sessionStorage.getItem("storedPhone");
  let country = window.sessionStorage.getItem("storedCountry");
  let unique = window.sessionStorage.getItem("storedUnique");

  let data = {
    name: fullname,
    username: unique,
    email: mail,
    country: country,
    phone: phone,
  };

  auth
    .createUserWithEmailAndPassword(mail, password)
    .then(function (user) {
      let ref = store.collection("users").doc(unique);

      ref.set(data).then(function () {
        console.log("Document successfully written!");

        let ref = db.ref("usernames/");

        ref.set({ items: [unique] }).then(function () {
          console.log(user);
          console.log(data);

          signup.reset();
          signupModal.classList.add("visually-hidden");
          successModal.classList.remove("visually-hidden");
        });
      });
    })
    .catch((ex) => {
      console.log(ex.message);
    });
});

// make a safe text
function makeSafeText(str) {
  const safeText = String(str).replace(/[()$~%.'":*?<>{}]/g, "");
  return safeText;
}
