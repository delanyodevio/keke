const signupUrl = document.getElementById("signupUrl");
const loginUrl = document.getElementById("loginUrl");
const logoutUrl = document.getElementById("logoutUrl");

const createFundForm = document.getElementById("createFundForm");
const fundsInfo = document.getElementById("fundsInfo");

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
    });

    fundsCollection.onSnapshot(function (snap) {
      renderFundInfo(snap);
    });

    // creates a funds sub-collection
    createFundForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let createFundButton = document.getElementById("createFundButton");
      createFundButton.innerHTML = "Creating...";

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
        records: [],
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
          }, 10000);

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
  } else {
    signupUrl.classList.remove("disabled");
    loginUrl.classList.remove("disabled");
    logoutUrl.classList.add("disabled");

    window.location.assign("/login");
  }
});

// Render user basic info
function renderPersonalInfo(doc) {
  let personalInfo = document.getElementById("personalInfo");
  let successorInfo = document.getElementById("successorInfo");
  let successorNotice = document.querySelector(".successorNotice");

  personalInfo.innerHTML = `
    <li>Name: <span>${doc.data().name}</span></li>
    <li>Contact: <span>${doc.data().phone}</span></li>
    <li>Email: <span>${doc.data().email}</span></li>
    <li>Country: <span>${doc.data().country}</span></li>
    `;

  if (doc.data().successor == null) {
    successorNotice.classList.remove("disabled");
  } else {
    successorInfo.innerHTML += `
      <ul>
      <li><span>Name:</span> ${doc.data().successor.name}</li>
      <li><span>Relation:</span> ${doc.data().successor.relation}</li>
      <li><span>Contact:</span> ${doc.data().successor.phone}</li>
      <li><span>Email:</span> ${doc.data().successor.email}</li>
      </ul>
      `;

    successorNotice.classList.add("disabled");
  }
}

// Render user funds
function renderFundInfo(snapshot) {
  let html = "";

  snapshot.forEach(function (doc) {
    let fund = doc.data();

    let lockClass = fund.lock ? "locked" : "unlocked";
    let WithdrawMessage = fund.lock ? "locked" : "Withdraw";

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
        <li><h3 class="text-400 weight-normal"></span>${fund.name.toUpperCase()}</h3></li>
        <li><span>Amount: </span>${fund.amount}</li>
        <li><span>Locking: </span>${fund.years} year(s)</li>
        <li><span>Date Created: </span>${createdDay}/${createdMonth}/${createdYear}</li>
        <li><span>Ending date: </span>${endDay}/${endMonth}/${endYear}</li>
        <li><span>Phone: </span>${fund.phone}</li>
      </ul>
      <a href="${doc.id}" class="button">View records</a>
      <a href="${doc.id}deposit" class="button">Deposit</a>
      <a href="${
        doc.id
      }cashout" class="[ ${lockClass} ][ button ]">${WithdrawMessage}</a>
      `;

    html += ul;
  });

  fundsInfo.innerHTML = html;
}

// logging out
logoutUrl.addEventListener("click", function (event) {
  event.preventDefault();

  auth.signOut().then(function () {
    window.location.assign("/");
  });
});
