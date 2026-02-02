import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjvJqA73pA44yMo5T_EW_Su3RlbfgWZw0",
  authDomain: "pet-mart-ad58b.firebaseapp.com",
  projectId: "pet-mart-ad58b",
  storageBucket: "pet-mart-ad58b.firebasestorage.app",
  messagingSenderId: "547970727409",
  appId: "1:547970727409:web:a46fcc795ae16f8ede9850",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
