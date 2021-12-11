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


enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
          console.log("db Persistence failed");
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
          console.log("db Persistence not compatible");
      }
  });

  async function getmealLogDb(db) {
    const mealLogDbCol = collection(db, 'mealLog');
    const mealLogDbSnapshot = await getDocs(mealLogDbCol);
    const mealList = mealLogDbSnapshot.docs.map(doc => doc.data());
    return mealList;
    
  }


 // const querySnapshot = await getDocs(collection(db, "mealLog"));
 //   querySnapshot.forEach((doc) => {
 //   renderMeal(doc.data(), doc.id);
 // });

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
       document.getElementById("add-meal").reset();
    });

const unsub = onSnapshot(collection(db, "mealLog"), (doc) => {
  doc.docChanges().forEach((change) => {
    if (change.type === "added") {
      renderMeal(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      removeMeal(change.doc.id);
    }
  });
});

//delete meal
const mealContainer = document.querySelector(".view-meal");
mealContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "I") {
    const id = event.target.getAttribute("data-id");
    deleteDoc(doc(db, "mealLog", id));
  }
});