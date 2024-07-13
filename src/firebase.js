// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkawqaB3JuoEWY0cFR4HF1y72ybpEVADY",
  authDomain: "uangku-696fd.firebaseapp.com",
  projectId: "uangku-696fd",
  storageBucket: "uangku-696fd.appspot.com",
  messagingSenderId: "827364232095",
  appId: "1:827364232095:web:b49fa72f7ca908c6e40baa",
  measurementId: "G-G3GC7HM7Y0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc};