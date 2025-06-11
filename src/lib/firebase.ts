import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqrW5BX-Hje2qPac8Z-VzhmX1YzUr20D4",
  authDomain: "luton-welfare.firebaseapp.com",
  projectId: "luton-welfare",
  // storageBucket: "lutonwelfareassociation.firebasestorage.app",
  messagingSenderId: "459166096265",
  appId: "1:367168461201:web:de52bb2477f915cf75a230",
  measurementId: "G-84LW3LZWG4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);