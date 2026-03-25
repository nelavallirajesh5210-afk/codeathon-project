import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDah3e5q302ANQgjGnJ0us42mC7p5tRWE8",
  authDomain: "footrush-store.firebaseapp.com",
  projectId: "footrush-store",
  storageBucket: "footrush-store.firebasestorage.app",
  messagingSenderId: "466786333834",
  appId: "1:466786333834:web:d343f13273d58df61ce973",
  measurementId: "G-FEB46BB9TN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
