// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import API_KEYS from "./apiKeys";

// Configuration Firebase
const firebaseConfig = {
    apiKey: API_KEYS.FIREBASE_API_KEY,
    authDomain: "medbrodie.firebaseapp.com",
    projectId: "medbrodie",
    storageBucket: "medbrodie.firebasestorage.com",
    messagingSenderId: "20472003639",
    appId: "1:20472003639:web:8b0e2b160e346b440cd3b2",
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
