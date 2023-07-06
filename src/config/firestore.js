// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcmnvppMXEPHut9bz-QzwR7nbnfLplaTY",
  authDomain: "pointonsales-f8ae0.firebaseapp.com",
  projectId: "pointonsales-f8ae0",
  storageBucket: "pointonsales-f8ae0.appspot.com",
  messagingSenderId: "568627569707",
  appId: "1:568627569707:web:88d4e80aed73501cfb366e",
  measurementId: "G-FKBN0QCP2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore=getFirestore(app);