import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFVYR1NLuw6_h7s6JeCW59bwnC9dxEK90",
  authDomain: "travel-app-ab4fc.firebaseapp.com",
  projectId: "travel-app-ab4fc",
  storageBucket: "travel-app-ab4fc.appspot.com",
  messagingSenderId: "409174512255",
  appId: "1:409174512255:web:2c234f766a3c927d48a54a",
};

const app = initializeApp(firebaseConfig);
export const FIRESTORE = getFirestore(app);
export const AUTH = getAuth(app);
