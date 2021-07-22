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
var category = database.collection("Categories");
const venders = [];
var categories = category.get().then((snapshot) => {
  snapshot.forEach((doc) => {
    const vendtable = document.querySelector("#vendors");
    var cat = doc.data().name;
    var j = 1;
    var vonde = database.collection(cat);
    var vondr = vonde.get().then((snapshot) => {
      snapshot.forEach((docc) => {
        venders.push(docc.data());

        vendtable.innerHTML +=
          "<tr><td>" +
          j +
          "</td><td>" +
          cat +
          "</td><td>" +
          docc.data().restaurantName +
          "</td><td>" +
          docc.data().ownerName +
          "</td><td>" +
          docc.data().restaurantContact +
          "</td><td>" +
          docc.data().place +
          "</td><td>" +
          docc.data().rating +
          "</td><td>" +
          docc.data().verified +
          "</td><td></td></tr>";
        j++;
      });
    });

    // custmlist.innerHTML +=
    //   "<option value=" + doc.id + ">" + doc.data().name + "</option>";
  });
  console.log(venders);
});

const adduser = async () => {
  var username = document.getElementById("vendor-name").value;
  var phonenumber = document.getElementById("vendor-number").value;
  if (phonenumber.length != 10) {
    alert("phone number is not valid");
  } else {
    await database
      .collection("AllVendors")
      .add({ name: username, phone: phonenumber });
  }
};

let cfile,sfile,sfile1;

var category_image = document.getElementById("category-image");
category_image.addEventListener('change',(e)=>{
  cfile = e.target.files[0];
})


var subcategory_image = document.getElementById("subcategory-image");
subcategory_image.addEventListener('change',(e)=>{
  sfile = e.target.files[0];
})

var subcategory_image = document.getElementById("subcategory-image-2");
subcategory_image.addEventListener('change',(e)=>{
  sfile1 = e.target.files[0];
})


const addcategory = async() => {
  var category = document.getElementById("category-1").value;
  var subcategory = document.getElementById("subcategory-1").value;
  var subcategory2 = document.getElementById("subcategory-2").value;
  
  var storage = firebase.storage();
  var storageref = storage.ref();
  var catimageref = storageref.child("/CategoryImages/"+category+".jpg");
  if(cfile){
    catimageref.put(cfile).then((snapshot)=>{
      console.log("uploaded");
  }).catch((err)=>{
      console.log("error");
  })
  }
  
  var catimageref = storageref.child("/SubcategoryImages/"+subcategory+".jpg");
  if(sfile){
    catimageref.put(sfile).then((snapshot)=>{
      console.log("uploaded");
  }).catch((err)=>{
      console.log("error");
  })
  
  }
 var catimageref = storageref.child("/SubcategoryImages/"+subcategory2+".jpg");
 if(sfile1){
  catimageref.put(sfile1).then((snapshot)=>{
    console.log("uploaded");
}).catch((err)=>{
    console.log("error");
})
 }
  
  var database = firebase.firestore();
  database.collection("AllCategories").doc(category).set({
    "name":category
  })
  const documentid = database.collection(category).doc();
  console.log(documentid.id);
  database.collection(category).doc(documentid.id).collection("SubCategory").doc(subcategory).set({
    "name":subcategory
  }).then((data)=>{
    console.log(data);
  }).catch(err=>{
    console.log(err);
  });

  if(subcategory2){
    database.collection(category).doc(documentid.id).collection("SubCategory").doc(subcategory2).set({
      "name":subcategory2
    }).then((data)=>{
      console.log(data);
    }).catch(err=>{
      console.log(err);
    });
  }
};
  const addvendor= async() => {
    // // var firestore=firebase.storage();
    // var storageRef = firebase.storage().ref();
    // var mountainsRef = storageRef.child(document.getElementById("vendor-image").value);
    console.log(document.getElementById("vendor-image").value);
    // var username = document.getElementById("vendor-name").value;
    // var phonenumber = document.getElementById("vendor-number").value;
    // if (phonenumber.length != 10) {
    //   alert("phone number is not valid");
    // } else {
    //   await database
    //     .collection("AllVendors")
    //     .add({ "name": username, "phone": phonenumber });
    // }
  };
  
