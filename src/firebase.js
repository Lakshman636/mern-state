// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e522e.firebaseapp.com",
  projectId: "mern-estate-e522e",
  storageBucket: "mern-estate-e522e.firebasestorage.app",
  messagingSenderId: "495797534478",
  appId: "1:495797534478:web:d2bbdc7f5902facc1f615f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);