// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL0kkMNt9a7QfN5OCU4cSIgAWv-C8PWTI",
  authDomain: "ujbusservices.firebaseapp.com",
  projectId: "ujbusservices",
  storageBucket: "ujbusservices.appspot.com",
  messagingSenderId: "656560153419",
  appId: "1:656560153419:web:cdef3de391bbb49dcd3ece",
  measurementId: "G-NFDJKPGWZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const authentication=getAuth(app);
export const db=getFirestore(app);