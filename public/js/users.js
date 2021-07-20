// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyB4wISJUiS-XSygFzTEl7EXK6Vda4Nou1Y",
  authDomain: "ulrapi-c8c19.firebaseapp.com",
  projectId: "ulrapi-c8c19",
  storageBucket: "ulrapi-c8c19.appspot.com",
  messagingSenderId: "240441563744",
  appId: "1:240441563744:web:ad0649db442135bb0fc105",
  measurementId: "G-526L2MHW5X",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
var users = database.collection("user");
const usertable = document.querySelector("#users");
const venders = [];
var j = 1;
var user = users.get().then((snapshot) => {
  snapshot.forEach((doc) => {
    console.log(doc.data());
    venders.push(doc.data());
    usertable.innerHTML +=
      "<tr><td>" +
      j +
      "</td><td>" +
      doc.data().name +
      "</td><td>" +
      doc.data().phone +
      "</td><td></td></tr>";
    j++;
  });
});

const adduser = async() => {
  var username = document.getElementById("user-name").value;
  var phonenumber = document.getElementById("phone-number").value;
  if (phonenumber.length != 10) {
    alert("phone number is not valid");
  } else {
    await database
      .collection("user")
      .add({ "name": username, "phone": phonenumber });
  }
};
