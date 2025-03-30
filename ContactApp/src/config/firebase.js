// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBR7_ytZjQJgomc4py3DgIVh1R64vd58Ys",
  authDomain: "vite-contactapp-4face.firebaseapp.com",
  projectId: "vite-contactapp-4face",
  storageBucket: "vite-contactapp-4face.firebasestorage.app",
  messagingSenderId: "463925397871",
  appId: "1:463925397871:web:49330ea21955e365dd009a",
  measurementId: "G-2LKH8SRB0X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);