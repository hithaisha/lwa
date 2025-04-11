import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0bVcLd7lN36KMw4ZDs9L_Doki8zWh2Pk",
  authDomain: "lutonwelfareassociation.firebaseapp.com",
  projectId: "lutonwelfareassociation",
  storageBucket: "lutonwelfareassociation.firebasestorage.app",
  messagingSenderId: "367168461201",
  appId: "1:367168461201:web:de52bb2477f915cf75a230",
  measurementId: "G-84LW3LZWG4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);