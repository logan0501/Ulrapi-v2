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
  var users = database.collection("Coupons");
  const usertable = document.querySelector("#coupons");
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
        doc.data().discount +
        "</td><td>"+doc.data().minAmount+"</td><td>"+doc.data().type+"</td><</tr>";
      j++;
    });
  });