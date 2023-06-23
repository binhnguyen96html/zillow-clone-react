// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxibHqrZnrbSBtDPosMVmaqWsO_i0mGc0",
  authDomain: "book-rent-react.firebaseapp.com",
  projectId: "book-rent-react",
  storageBucket: "book-rent-react.appspot.com",
  messagingSenderId: "497240666918",
  appId: "1:497240666918:web:adace2045a4689bcf347e7",
  measurementId: "G-MLG9JQXMZH"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();