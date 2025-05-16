// firebase.js

// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'

// Configuration Firebase
const firebaseConfig = {

    apiKey: "AIzaSyAGlIJKzKkbDAH7SygtlixwmFw85Dbx_y0",
    authDomain: "medbrodie.firebaseapp.com",
    projectId: "medbrodie",
    storageBucket: "medbrodie.firebasestorage.com",
    messagingSenderId: "20472003639",
    appId: "1:20472003639:web:8b0e2b160e346b440cd3b2"

};


// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

// const auth = getAuth(app);
// const db = getFirestore(app);
const auth = firebase.auth()

export { auth };
