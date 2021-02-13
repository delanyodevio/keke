const onboardForm = document.getElementById("onboardForm");
const errorMessage = document.getElementById("errorMessage");
const phoneNumberInput = document.getElementById("phone");
const signupButton = document.getElementById("signupButton");

// Confirm the link is a sign-in with email link.
if (auth.isSignInWithEmailLink(window.location.href)) {
  var email = window.localStorage.getItem("emailForSignIn");
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    email = window.prompt("Please provide your email for verification.");
  }

  auth
    .signInWithEmailLink(email, window.location.href)
    .then(function (result) {
      if (result.additionalUserInfo.isNewUser) {
        let emailInput = document.getElementById("email");
        emailInput.value = result.user.email;

        onboardForm.addEventListener("submit", function (event) {
          event.preventDefault();

          signupButton.innerHTML = "working...";

          let fullname = makeSafeText(onboardForm.fullname.value);
          let username = result.user.uid;
          let email = result.user.email;
          let phone = window.sessionStorage.getItem("phoneStored");
          let country = window.sessionStorage.getItem("countryStored");

          let data = {
            name: fullname,
            email: email,
            country: country,
            phone: phone,
          };

          let fund = {
            name: "kekepot",
            lock: false,
            description: `
            Kekepot is a special fund to help you with your spending 
            activities. You can deposit into 
            and cashout from this fund at anytime.
            `,
            phone: phone,
            total: 0,
            created: null,
            ends: null,
            years: null,
          };

          let ref = store.collection("users").doc(username);
          let kekepotRef = ref.collection("funds").doc("kekepot");

          ref
            .set(data)
            .then(function () {
              let ref = db.ref("usernames/" + "items");

              let listRef = ref.push();

              listRef
                .set(username)
                .then(kekepotRef.set(fund, { merge: true }))
                .then(function () {
                  onboardForm.reset();
                  window.localStorage.removeItem("emailForSignIn");

                  window.location.assign("/pages/waiting/");
                });
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
      } else {
        window.location.assign(`/users/${result.user.uid}#funds`);
      }
    })
    .catch(function () {
      errorMessage.classList.remove("disabled");
      errorMessage.innerHTML = `<p>Error handling authentication. Please try again.</p>`;
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

// make a safe text
function makeSafeText(str) {
  const safeText = String(str).replace(/[()$~%.'":*?<>{}]/g, "");
  return safeText;
}
