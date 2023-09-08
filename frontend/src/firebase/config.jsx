// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZJwm3TYMl8zvAwpQLgEmi6UY6u06E-zo",
  authDomain: "scepter-9bf61.firebaseapp.com",
  projectId: "scepter-9bf61",
  storageBucket: "scepter-9bf61.appspot.com",
  messagingSenderId: "793660216920",
  appId: "1:793660216920:web:6176050b40176a14245c2d",
  measurementId: "G-65CLXX9723"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export{ auth, provider};