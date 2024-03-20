// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
//import firebase from 'firebase/app';
import 'firebase/storage';
import "firebase/compat/storage";
import firebase from 'firebase/compat/app'; // Import the compat version of firebase
import 'firebase/compat/storage'; 



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZbxNk-f-uWpr0JTTrxZpIwrqOykk3hQ4",
  authDomain: "capstonefinal-ddbb0.firebaseapp.com",
  projectId: "capstonefinal-ddbb0",
  storageBucket: "capstonefinal-ddbb0.appspot.com",
  messagingSenderId: "603857785138",
  appId: "1:603857785138:web:97d5189a5f36fa0a80472b",
  measurementId: "G-EMQ2T8L8PN",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// //const storage = firebase.storage();
//  //const storage =getStorage(app)
// export default firebase;

// const analytics = getAnalytics(app);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const storage = firebase.storage();