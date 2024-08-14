// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcr0saKlQU0hSzbtObGjBk2FgY2_FE1wQ",
  authDomain: "calendarappauth.firebaseapp.com",
  projectId: "calendarappauth",
  storageBucket: "calendarappauth.appspot.com",
  messagingSenderId: "263304583296",
  appId: "1:263304583296:web:852126f16dabd00c606e65",
  measurementId: "G-1R8TT8MNJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };