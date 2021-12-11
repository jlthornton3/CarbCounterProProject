import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

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
const auth = getAuth(app);

//auth status change
onAuthStateChanged(auth,(user) => {
  if (user){
    console.log("User loggedin: ", user.email);
    
  }else{
    console.log("User logged out");
  }
});

//user signup
const signupForm=document.querySelector("#new-user-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //get user info
  const auth = getAuth(app);
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-psw"].value;
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) =>{
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    const modal =document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    // ...
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
});

//logout
const logout=document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth).then(() => {
    console.log("User has signed out")
  }).catch((error) => {
    //error
  });
});

//login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e)=> {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-psw"].value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) =>{
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        const modal =document.querySelector("#modal-login");
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        // ...
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  });

  