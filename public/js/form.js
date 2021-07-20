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
categoryselect = document.getElementById("category");
vendorselect = document.getElementById("vendor");
typeselect = document.getElementById("type");
subtypeselect = document.getElementById("sub-type-list");
subtypeinput = document.getElementById("sub-type");
menuselect = document.getElementById("menu-list");
var category = database.collection("Categories");
const venders=[];
var categories = category
  .get()
  .then((snapshot) => {
         snapshot.forEach((doc) => {
           var cat = doc.data().name;
      
             var opt = document.createElement("option");
             opt.value = cat;
             opt.innerHTML = cat;
             categoryselect.appendChild(opt);
           
         });
  });


categoryselect.onchange = function () {
  setvonder();
};

  function setvonder() {
    var collect = categoryselect.value;
     var vonde = database.collection(collect);
   var vondr = vonde.get().then((snapshot) => {
      snapshot.forEach((doc) => {
    
 var opt = document.createElement("option");
 opt.value = doc.id;
 opt.innerHTML = doc.data().RestaurantName;
 vendorselect.appendChild(opt);
      });
    });
  }


  vendorselect.onchange = function () {
    settype();

  };


  function settype() {
    var collect = categoryselect.value;
    var vonder = vendorselect.value;
    var typeco = database.collection(collect).doc(vonder).collection("SubCategory");
    var subtype = typeco.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        
        var opt = document.createElement("option");
        opt.value = doc.id;
        opt.innerHTML = doc.data().name;
        typeselect.appendChild(opt);
      });
    });
  }








    typeselect.onchange = function () {
      setsubtype();
      
    };

    function setsubtype() {
      var collect = categoryselect.value;
      var vonder = vendorselect.value;
      var typeselects = typeselect.value;
       
      var typeco = database
        .collection(collect)
        .doc(vonder)
        .collection("SubCategory")
        .doc(typeselects)
        .collection("Items");
         
      var subtype = typeco.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          var opt = document.createElement("option");
          opt.value = doc.id;
          opt.innerHTML = doc.data().Name;
          subtypeselect.appendChild(opt);
        });
      });
    }


    

function subtypechange(text) { 
 var collect = categoryselect.value;
 var vonder = vendorselect.value;
 var typeselects = typeselect.value;
//  var subtypeselects = subtypeselect.innerHTML;
//  alert(subtypeselects);
 var typeco = database
   .collection(collect)
   .doc(vonder)
   .collection("SubCategory")
   .doc(typeselects)
   .collection("Items")
   .doc(text)
   .collection("SubItems");
 var subtype = typeco.get().then((snapshot) => {
   snapshot.forEach((doc) => {
     var opt = document.createElement("option");
     opt.value = doc.id;
     opt.innerHTML = doc.data().name;
     menuselect.appendChild(opt);
   });
 });
}

$("#adddata").submit(function (evt) {
  evt.preventDefault();

var collect = categoryselect.value;
var vonder = vendorselect.value;
var typeselects = typeselect.value;
var subtypeselects = subtypeinput.value;
var menu = document.getElementById("menu").value;
var time = document.getElementById("time").value;
var price = document.getElementById("price").value;
var addon = document.getElementById("addon").value;
var typeco = database
  .collection(collect)
  .doc(vonder)
  .collection("SubCategory")
  .doc(typeselects)
  .collection("Items")
  .doc(subtypeselects)
  .collection("SubItems");
typeco.doc(menu).set({desc:time,name:menu,price:price,vendor:vonder})
.then(function(){
typeco.doc(menu).collection("Addons").doc(addon).set({ Name: addon });
location.reload();
});



});