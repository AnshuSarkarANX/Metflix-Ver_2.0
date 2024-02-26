import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FirebaseAPI } from "./request";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: FirebaseAPI,
  authDomain: "metflix2-0.firebaseapp.com",
  projectId: "metflix2-0",
  storageBucket: "metflix2-0.appspot.com",
  messagingSenderId: "626415289310",
  appId: "1:626415289310:web:a614e618c748331d3bd34f",
  measurementId: "G-R71RWBNWY1",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
export { auth, db };
