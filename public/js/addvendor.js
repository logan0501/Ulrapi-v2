const nameipt = document.getElementById('vendorname')
const phoneipt = document.getElementById('phonenumber')
const restipt = document.getElementById('restarauntname')
const addressipt = document.getElementById('address')
const locationipt = document.getElementById('location')
const addvendorbtn = document.getElementById('addvendor-btn')
const fileipt = document.getElementById('vendor-image')
const establishipt = document.getElementById('establishtype')
const verfifycheck = document.querySelector('#verifycheck');
const acceptordercheck = document.querySelector('#acceptordercheck')
const categoryipt = document.getElementById('category1')
let file;
let weekdays;



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
//   firebase.initializeApp(firebaseConfig);



function addVendor(event){
    event.preventDefault();

    const name = nameipt.value;
    const phonenumber = phoneipt.value;
    const resname = restipt.value;
    const address = addressipt.value;
    const location = locationipt.value;
    const establishvalue = establishipt.value;
    const weekdays = Array.from(document.querySelectorAll("input[type=checkbox][name=workingdays]:checked")).map(e => e.value)
    const verified = verfifycheck.checked;
    const acceptorder = acceptordercheck.checked;
    const category = categoryipt.value;
    const subcategory=document.getElementById("subcategory1").value;
    const item=document.getElementById("item1").value;
    const subitem=document.getElementById("subitem1").value;
    var db = firebase.firestore();
    const 
    if(name && phonenumber.length==10){
        const allvendars = {"name":name,"phonenumber":phonenumber};
        
        var storage = firebase.storage();
        var storageref = storage.ref();
        var imageref = storageref.child("/VendorImages/"+phonenumber+".jpg");
        imageref.put(file).then((snapshot)=>{
            console.log("uploaded"+snapshot);
        }).catch((err)=>{
            console.log("error");
        })
        db.collection("AllVendors").doc(phonenumber).set(allvendars)
        .then(() => {
            console.log("Document successfully written!");
            db.collection(category).doc(phonenumber).set({"name":category,"restaruntname":resname,
            "location":location,
            "address":address,
              "verified":verified,
            "workingdays":weekdays,
        "vendorname":name,
    "phonenumber":phonenumber  });
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        
    }else{
        alert("Enter proper values")
    }
    await db.collection("AllCategories").doc(category).set({"name":category,"uid":phonenumber});
    await db.collection(category).doc(phonenumber).set({"acceptingorders":acceptorder,})
console.log(category,subcategory,item,subitem).then(()=>{
    console.log("added successfully");
})
    
};


addvendorbtn.addEventListener('click',addVendor);
fileipt.addEventListener('change',(e)=>{
    file = e.target.files[0];
})