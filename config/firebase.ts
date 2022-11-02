// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4-WV3DnZLD4KgKLRsQpdoywtTzAVRSD8",
  authDomain: "car-dealer-nextjs-typescript.firebaseapp.com",
  projectId: "car-dealer-nextjs-typescript",
  storageBucket: "car-dealer-nextjs-typescript.appspot.com",
  messagingSenderId: "389972249983",
  appId: "1:389972249983:web:94038fa289d8ed45155e4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db};