const signupUrl = document.getElementById("signupUrl");
const loginUrl = document.getElementById("loginUrl");
const logoutUrl = document.getElementById("logoutUrl");
const fundsInfo = document.getElementById("fundsInfo");

const createFundForm = document.getElementById("createFundForm");
const personalForm = document.getElementById("personalForm");
const successorForm = document.getElementById("successorForm");

auth.onAuthStateChanged(function (user) {
  if (user) {
    signupUrl.classList.add("disabled");
    loginUrl.classList.add("disabled");
    logoutUrl.classList.remove("disabled");

    let ref = store.collection("users").doc(user.uid);
    let fundsCollection = ref.collection("funds");

    // fetches and listens to a user.uid document in the users collection
    ref.onSnapshot(function (doc) {
      renderPersonalInfo(doc);

      fundsCollection.onSnapshot(function (snap) {
        renderFundInfo(snap);
      });

      let account = doc.data();

      personalForm.personalName.value = account.name;
      personalForm.personalEmail.value = account.email;
      personalForm.personalPhone.value = account.phone;
      personalForm.personalCountry.value = account.country;

      if (account.successor != null) {
        let successor = account.successor;
        successorForm.successorName.value = successor.name;
        successorForm.successorEmail = successor.email;
        successorForm.successorPhone = successor.phone;
        successorForm.successorRelation = successor.relation;
      }
    });

    // creates/updates a funds sub-collection
    createFundForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let createFundButton = document.getElementById("createFundButton");
      createFundButton.innerHTML = "working...";

      let name = createFundForm.fundName.value;
      let unique = name.replace(/\s+/g, "");
      let phone = createFundForm.fundPhone.value;

      let fundRef = ref.collection("funds").doc(unique);

      let endingDate = window.localStorage.getItem("endingDate");

      let fund = {
        name: name,
        lock: true,
        amount: 0,
        years: createFundForm.lockYears.value,
        phone: phone,
        created: firebase.firestore.Timestamp.fromDate(new Date(Date.now())),
        ends: firebase.firestore.Timestamp.fromDate(new Date(endingDate)),
      };

      fundRef
        .set(fund, { merge: true })
        .then(function () {
          let addFundMessage = document.getElementById("addFundMessage");
          let successFund = document.querySelector(".fund-name");

          createFundForm.classList.add("disabled");
          createFundButton.innerHTML = "Create";

          successFund.innerHTML = name.toUpperCase();
          addFundMessage.classList.remove("errorMessage");
          addFundMessage.classList.add("successMessage");
          addFundMessage.classList.remove("disabled");

          setTimeout(function () {
            addFundMessage.classList.add("disabled");
          }, 5000);

          window.localStorage.removeItem("endingDate");
          createFundForm.reset();
        })
        .catch(function () {
          addFundMessage.innerHTML = "<p>Error creating fund</p>";
          addFundMessage.classList.remove("successMessage");
          addFundMessage.classList.add("errorMessage");
          addFundMessage.classList.remove("disabled");

          setTimeout(function () {
            addFundMessage.classList.add("disabled");
          }, 10000);
        });
    });

    // Updates a user
    personalForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let personalFormBtn = document.getElementById("personalFormBtn");
      personalFormBtn.innerHTML = "working...";

      let name = personalForm.personalName.value;
      let phone = personalForm.personalPhone.value;
      let email = personalForm.personalEmail.value;

      let data = { name: name, phone: phone, email: email };

      ref.set(data, { merge: true }).then(function () {
        personalFormBtn.innerHTML = "update";

        let personalUpdate = document.getElementById("personalUpdate");
        personalUpdate.classList.remove("disabled");

        setTimeout(function () {
          personalUpdate.classList.add("disabled");
        }, 5000);
      });
    });

    // adds/updates a successor
    successorForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let successorFormBtn = document.getElementById("successorFormBtn");
      successorFormBtn.innerHTML = "working...";

      let name = successorForm.successorName.value;
      let email = successorForm.successorEmail.value;
      let phone = successorForm.successorPhone.value;
      let relation = successorForm.successorRelation.value;

      let data = { name: name, email: email, phone: phone, relation: relation };

      ref.set({ successor: data }, { merge: true }).then(function () {
        let successorUpdate = document.getElementById("successorUpdate");

        successorFormBtn.innerHTML = "update";

        successorUpdate.classList.remove("disabled");

        setTimeout(function () {
          successorUpdate.classList.add("disabled");
        }, 5000);
      });
    });
  } else {
    signupUrl.classList.remove("disabled");
    loginUrl.classList.remove("disabled");
    logoutUrl.classList.add("disabled");

    window.location.assign("/login");
  }
});

// Render user account info
function renderPersonalInfo(doc) {
  let personalInfo = document.getElementById("personalInfo");
  let successorInfo = document.getElementById("successorInfo");
  let successorNotice = document.getElementById("successorNotice");

  let user = doc.data();

  let countryName = user.country.replace(/\s+/g, "").toLowerCase();
  let countryRef = store.collection("countries").doc(countryName);

  countryRef.get().then(function (country) {
    window.localStorage.setItem("currency", country.data().currency);
  });

  personalInfo.innerHTML = `
    <li>${user.name}</li>
    <li>${user.phone}</li>
    <li>${user.email}</li>
    <li>${user.country}</li>
    `;

  if (user.successor == null) {
    successorNotice.classList.remove("disabled");
  } else {
    successorInfo.innerHTML = `
      <ul class="successor">
        <li>${user.successor.name}</li>
        <li>${user.successor.relation}</li>
        <li>${user.successor.phone}</li>
        <li>${user.successor.email}</li>
      </ul>
      `;

    successorNotice.classList.add("disabled");
  }
}

// Render user funds
function renderFundInfo(snapshot) {
  let noFundCreated = document.getElementById("noFundCreated");
  let html = "";
  let currency = window.localStorage.getItem("currency");

  if (snapshot != null) {
    noFundCreated.classList.add("disabled");

    snapshot.forEach(function (doc) {
      let fund = doc.data();

      let lockClass = fund.lock ? "locked" : "unlocked";
      let lockMessage = fund.lock ? "Fund locked" : "Fund Unlocked";

      let dateCreated = fund.created.toDate();
      let createdYear = dateCreated.getFullYear();
      let createdMonth = dateCreated.getMonth();
      let createdDay = dateCreated.getDate();

      let dateEnded = fund.ends.toDate();
      let endYear = dateEnded.getFullYear();
      let endMonth = dateEnded.getMonth();
      let endDay = dateEnded.getDate();

      let ul = `
        <ul class="eachFund">
          <li class="heading">${fund.name.toUpperCase()}</li>
          <li>${currency} ${fund.amount}</li>
          <li>${fund.years}year(s)</li>
          <li>Created on, ${createdDay}/${createdMonth}/${createdYear}</li>
          <li>Ending at, ${endDay}/${endMonth}/${endYear}</li>
          <li>${fund.phone}</li>
          <li  class="${lockClass}">${lockMessage}</li>
        </ul>
        `;

      html += ul;
    });

    fundsInfo.innerHTML = html;
  } else {
    noFundCreated.classList.remove("disabled");
  }
}

// logging out
logoutUrl.addEventListener("click", function (event) {
  event.preventDefault();

  auth.signOut().then(function () {
    window.location.assign("/");
  });
});
