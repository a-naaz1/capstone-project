// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbmljMrgaDdBW6sWJquQOvYfybynNYaF0",
  authDomain: "capstoneapp-d51b3.firebaseapp.com",
  projectId: "capstoneapp-d51b3",
  storageBucket: "capstoneapp-d51b3.appspot.com",
  messagingSenderId: "90695927797",
  appId: "1:90695927797:web:b2f001e905d27582a302bc",
  measurementId: "G-J64V4YBK2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage =getStorage(app)
const analytics = getAnalytics(app);