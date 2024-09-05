// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBt7KTc4XcwBj2VvwM8SheYA7sUUwaJqjw",
  authDomain: "project-3c9d2.firebaseapp.com",
  projectId: "project-3c9d2",
  storageBucket: "project-3c9d2.appspot.com",
  messagingSenderId: "614502429177",
  appId: "1:614502429177:web:5ed4f749f04d09ee584d28",
  measurementId: "G-M2Q39D4P35"
}; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,app,db
}