// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdmv2R_QMQS9OH5gL2AMuxznERuPUxofE",
    authDomain: "pdf-tool-dde90.firebaseapp.com",
    projectId: "pdf-tool-dde90",
    storageBucket: "pdf-tool-dde90.appspot.com",
    messagingSenderId: "472894923798",
    appId: "1:472894923798:web:a2b1ce6b420cf9bea6c137"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

