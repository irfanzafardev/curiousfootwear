// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHAN_PRTi5LkYQbo-Qa6cOLu_qN_GsMx8",
  authDomain: "thecuriousfootwear.firebaseapp.com",
  projectId: "thecuriousfootwear",
  storageBucket: "thecuriousfootwear.appspot.com",
  messagingSenderId: "63632723380",
  appId: "1:63632723380:web:2f12e54cd5d1641345f6e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app