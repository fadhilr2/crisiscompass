// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFoC0HLJpV7SebTQNZ9A8Ondohe1sMZkY",
  authDomain: "crisiscompass-95f1a.firebaseapp.com",
  projectId: "crisiscompass-95f1a",
  storageBucket: "crisiscompass-95f1a.appspot.com",
  messagingSenderId: "548635141458",
  appId: "1:548635141458:web:a47df55c25ffabd42d068b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app