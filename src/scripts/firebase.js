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
const store = project.firestore();
const db = project.database();

// update firestore settings
store.settings({ timestampsInSnapshots: true });
