// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { 
        getFirestore,
        collection,
        getDocs,
        onSnapshot,
        addDoc,
        deleteDoc,
        doc,
        enableIndexedDbPersistence
        } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClNGp515YHGqAhL9LKss72JhLLd2CrpiI",
  authDomain: "carbcounterpro-54c5d.firebaseapp.com",
  projectId: "carbcounterpro-54c5d",
  storageBucket: "carbcounterpro-54c5d.appspot.com",
  messagingSenderId: "775741397142",
  appId: "1:775741397142:web:f55dcf5d0b55d4102c8ab7",
  measurementId: "G-PZH081NWE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function getFoodDb(db) {
  const foodDbCol = collection(db, 'foodDatabase');
  const foodDbSnapshot = await getDocs(foodDbCol);
  const foodList = foodDbSnapshot.docs.map(doc => doc.data());
  return foodList;
}

async function getmealLogDb(db) {
  const mealLogDbCol = collection(db, 'mealLog');
  const mealLogDbSnapshot = await getDocs(mealLogDbCol);
  const mealList = mealLogDbSnapshot.docs.map(doc => doc.data());
  return mealList;
}
enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });

document.getElementById('add-meal').addEventListener(('submit'), (event) => {
        try {
          event.preventDefault();
          const timeElapsed = Date.now();
          const today = new Date(timeElapsed);
         const docRef = addDoc(collection(db, "mealLog"), {
            mealname: document.getElementById('mealname').value,
            bg: document.getElementById('bg').value,
            carbs: document.getElementById('carbs').value,
            fat: document.getElementById('fat').value,
            protein: document.getElementById('protein').value,
            insulin: document.getElementById('insulin').value,
            //bolus: document.getElementById('bolus').value,
            feedback: document.getElementById('feedback').value,
            mealTimestamp: today
            });
        console.log("Document written with ID: ", docRef.id);
        }catch (event) {
        console.error("Error adding document: ", event);
        }  
        document.getElementById('add-meal').style.display = 'none';
       // document.getElementById("add-meal").reset();
    })

    function renderFoods(dc){
      let li = document.createElement("li");
      li.className="collection-item";
      let name = document.createElement("text");
      let fat = document.createElement("span");
      let carbs = document.createElement("span");
      let protein = document.createElement("span");
      let size = document.createElement("span");
      let plus = document.createElement('span');

      li.setAttribute('data-id', dc.id);
      name.textContent = dc.data().Name;
      fat.textContent = dc.data().fat;
      carbs.textContent = dc.data().carbs;
      protein.textContent = dc.data().protein;
      size.textContent = dc.data().size;
      plus.textContent = '+';

      li.appendChild(name);
      li.appendChild(fat);
      li.appendChild(carbs);
      li.appendChild(protein);
      li.appendChild(size);
      li.appendChild(plus);

     // foodList.appendChild(li);

  }


  const foods = getDocs(collection(db, "foodDatabase")).then((snapshot) => {
      snapshot.forEach((doc) => {
          renderFoods(doc)
      })
  })

  


  const mealList =document.querySelector('#view-meal');

  function renderMeal(dc){
    let tr = document.createElement("tr");
    let mealName = document.createElement("td");
    let mealFat = document.createElement("td");
    let mealCarbs = document.createElement("td");
    let mealProtein = document.createElement("td");
    let mealInsulin = document.createElement("td");
    let mealFeedback = document.createElement("td");
    let mealTimeStamp = document.createElement("td")
    let edit = document.createElement("a");
    edit.setAttribute('id','btn-edit')
    edit.setAttribute('class','button class="waves-effect waves-teal btn-flat');
    tr.setAttribute('data-id', dc.id);

    mealName.textContent = dc.mealname;
    mealFat.textContent = dc.fat;
    mealCarbs.textContent = dc.carbs;
    mealProtein.textContent = dc.protein;
    mealInsulin.textContent = dc.insulin;
    mealFeedback.textContent = dc.feedback;
    mealTimeStamp.textContent = dc.timestamp;
    edit.textContent = 'E';

    tr.appendChild(mealName);
    tr.appendChild(mealFat);
    tr.appendChild(mealCarbs);
    tr.appendChild(mealProtein);
    tr.appendChild(mealInsulin);
    tr.appendChild(mealFeedback);
    tr.appendChild(mealTimeStamp);
    tr.appendChild(edit);

    mealList.appendChild(tr);

}

const unsub = onSnapshot(collection(db, "mealLog"), (doc) => {
  doc.docChanges().forEach((change) => {
    if (change.type === "added") {
      renderMeal(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      //do something
    }
  });
});

const form = document.querySelector('#new-user-form');

form.addEventListener(('submit'), (e) => {

    const email = form.email.value;
    const password = form.psw.value;
    const password2= form.psw2.value;
     
  // if (password != password2) {
  //    alert ("\nPasswords don't match")
  //    return false;
  //    }
    // If same return True.
  //    else{
  //      return true;
  //        }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("The User was created")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
        });
})