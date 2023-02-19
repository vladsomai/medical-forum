import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlGV7zo72S08XJv15-TRe_L-cf0_Z8sbI",
  authDomain: "medicalforum-19fb2.firebaseapp.com",
  projectId: "medicalforum-19fb2",
  storageBucket: "medicalforum-19fb2.appspot.com",
  messagingSenderId: "101056477350",
  appId: "1:101056477350:web:df621f81e384297ac15c67",
  measurementId: "G-38V27RJVD6"
};

export const medicalForumFirebaseApp = initializeApp(firebaseConfig);
export const medicalForumFirebaseAuth = getAuth(medicalForumFirebaseApp);
export const medicalForumFirebaseFirestore = getFirestore(medicalForumFirebaseApp);
