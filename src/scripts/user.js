const signupUrl = document.getElementById("signupUrl");
const loginUrl = document.getElementById("loginUrl");
const logoutUrl = document.getElementById("logoutUrl");
const fundsInfo = document.getElementById("fundsInfo");

const createFundForm = document.getElementById("createFundForm");
const depositForm = document.getElementById("depositForm");
const cashoutForm = document.getElementById("cashoutForm");
const personalForm = document.getElementById("personalForm");
const successorForm = document.getElementById("successorForm");

const viewRecordLink = document.getElementById("viewRecordLink");

auth.onAuthStateChanged(function (user) {
  if (user) {
    signupUrl.classList.add("disabled");
    loginUrl.classList.add("disabled");
    logoutUrl.classList.remove("disabled");

    // To enable offline data support
    store.enablePersistence();

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

    // creates a funds sub-collection
    createFundForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let createFundButton = document.getElementById("createFundButton");
      createFundButton.innerHTML = "working...";

      let name = createFundForm.fundName.value.trim().toUpperCase();
      let unique = name.replace(/\s+/g, "").toLowerCase();
      let phone = createFundForm.fundPhone.value.trim();

      let fundRef = ref.collection("funds").doc(unique);

      let endingDate = window.localStorage.getItem("endingDate");

      let fund = {
        name: name,
        lock: true,
        total: 0,
        years: createFundForm.lockYears.value,
        phone: phone,
        created: firebase.firestore.Timestamp.fromDate(new Date(Date.now())),
        ends: firebase.firestore.Timestamp.fromDate(new Date(endingDate)),
      };

      fundRef.set(fund, { merge: true }).then(function () {
        window.localStorage.setItem(`${unique}`, phone);
        createFundButton.innerHTML = "create";

        let addFundSuccess = document.getElementById("addFundSuccess");
        addFundSuccess.classList.remove("disabled");

        window.localStorage.removeItem("endingDate");
        createFundForm.reset();
      });
    });

    // Updates a user document
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

    // adds a successor to a user document
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

    // Deposit into the user fund
    depositForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let depositBtn = document.getElementById("depositBtn");
      depositBtn.innerHTML = "working...";

      let method = depositForm.depositMethod.value;
      let unique = depositForm.depositFund.value
        .replace(/\s+/g, "")
        .trim()
        .toLowerCase();
      let phone = window.localStorage.getItem(unique);
      let amount = parseInt(depositForm.depositAmount.value);

      let data = {
        type: "Deposit",
        when: firebase.firestore.Timestamp.fromDate(new Date(Date.now())),
        amount: amount,
      };

      let depositRef = ref.collection("funds").doc(unique);

      depositRef
        .update({
          records: firebase.firestore.FieldValue.arrayUnion(data),
          total: firebase.firestore.FieldValue.increment(amount),
        })
        .then(function () {
          depositForm.reset();
          depositBtn.innerHTML = "deposit";

          let depositSuccess = document.getElementById("depositSuccess");
          depositSuccess.classList.remove("disabled");
        });
    });

    // Withdraw/Cashout from the user fund
    cashoutForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let cashoutBtn = document.getElementById("cashoutBtn");
      cashoutBtn.innerHTML = "working...";

      let method = cashoutForm.cashoutMethod.value;
      let unique = cashoutForm.cashoutFund.value
        .replace(/\s+/g, "")
        .trim()
        .toLowerCase();
      let phone = window.localStorage.getItem(unique);
      let amount = parseInt(cashoutForm.cashoutAmount.value);
      let decrement = -amount;

      let data = {
        type: "Cashout",
        when: firebase.firestore.Timestamp.fromDate(new Date(Date.now())),
        amount: amount,
      };

      let cashoutRef = ref.collection("funds").doc(unique);

      cashoutRef.get().then(function (doc) {
        if (amount > doc.data().total || doc.data().lock) {
          let cashoutError = document.getElementById("cashoutError");
          cashoutError.classList.remove("disabled");

          cashoutBtn.innerHTML = "cashout";
          cashoutForm.cashoutAmount.value = "";

          setTimeout(function () {
            cashoutError.classList.add("disabled");
          }, 15000);
        } else {
          cashoutError.classList.add("disabled");

          cashoutRef
            .update({
              records: firebase.firestore.FieldValue.arrayUnion(data),
              total: firebase.firestore.FieldValue.increment(decrement),
            })
            .then(function () {
              cashoutForm.reset();
              cashoutBtn.innerHTML = "cashout";

              let cashoutSuccess = document.getElementById("cashoutSuccess");
              cashoutSuccess.classList.remove("disabled");
            });
        }
      });
    });

    let recordsTable = document.getElementById("recordsTable");

    fundsCollection.get().then(function (snapshot) {
      let table = "";
      snapshot.forEach(function (doc) {
        let records = doc.data().records;

        let tableData = "";
        records.forEach(function (record) {
          let when = record.when.toDate();
          let day = when.getDate();
          let month = when.getMonth() + 1;
          let year = when.getFullYear();
          let td = `
            <tr>
              <td>${record.type}</td>
              <td>${record.amount}</td>
              <td>${day}/${month}/${year}</td>
            </tr>
            `;

          tableData += td;
        });

        let renderedRecords = `
          <table class="margin-top-500">
          <caption>Records of ${doc.data().name}</caption>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${tableData}
            </tbody>
          </table>
          `;

        table += renderedRecords;
      });
      recordsTable.innerHTML = table;
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
  let html = "";
  let currency = window.localStorage.getItem("currency");

  snapshot.forEach(function (doc) {
    let fund = doc.data();

    let lockClass = fund.lock ? "locked" : "unlocked";
    let lockMessage = fund.lock
      ? `Cashout locked for ${fund.years} year(s)`
      : "Cashout Unlocked";

    let dateCreated = fund.created.toDate();
    let createdYear = dateCreated.getFullYear();
    let createdMonth = dateCreated.getMonth() + 1;
    let createdDay = dateCreated.getDate();

    let dateEnded = fund.ends.toDate();
    let endYear = dateEnded.getFullYear();
    let endMonth = dateEnded.getMonth() + 1;
    let endDay = dateEnded.getDate();

    let ul = `
      <ul class="eachFund">
        <li class="heading">${fund.name}</li>
        <li>${currency} ${fund.total}</li>
        <li>Start, ${createdDay}/${createdMonth}/${createdYear}</li>
        <li>End, ${endDay}/${endMonth}/${endYear}</li>
        <li>${fund.phone}</li>
        <li  class="${lockClass}">${lockMessage}</li>
      </ul>
      `;

    html += ul;
  });

  fundsInfo.innerHTML = html;
}

let depositFund = document.getElementById("depositFund");
let depositPhone = document.getElementById("depositPhone");
pickPhoneNumber(depositFund, depositPhone);

let cashoutPhone = document.getElementById("cashoutPhone");
let cashoutFund = document.getElementById("cashoutFund");
pickPhoneNumber(cashoutFund, cashoutPhone);

// Output the phone number when the found name is typed
function pickPhoneNumber(inputElement, outputElement) {
  inputElement.addEventListener("input", function () {
    let name = inputElement.value.replace(/\s+/g, "").trim().toLowerCase();
    let phone = window.localStorage.getItem(name);

    outputElement.value = phone;
  });
}

let addFundDone = document.getElementById("addFundDone");
reloadPage(addFundDone, createFundForm);

let depositDone = document.getElementById("depositDone");
reloadPage(depositDone, depositForm);

let cashoutDone = document.getElementById("cashoutDone");
reloadPage(cashoutDone, cashoutForm);

// Function to reload the current page when a link is click.
function reloadPage(element, form) {
  element.addEventListener("click", function (event) {
    event.preventDefault();
    document.location.reload();
    form.classList.add("disabled");
  });
}

let records = document.getElementById("records");
viewRecordLink.addEventListener("click", function () {
  records.classList.remove("disabled");
});

let closeRecords = document.getElementById("closeRecords");
closeRecords.addEventListener("click", function (event) {
  event.stopPropagation();
  records.classList.add("disabled");
});

// logging out
logoutUrl.addEventListener("click", function (event) {
  event.preventDefault();

  auth.signOut().then(function () {
    window.location.assign("/");
  });
});
