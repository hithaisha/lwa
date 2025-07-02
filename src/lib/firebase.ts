import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDTQDld43G4sFLcGS7RTRzkX_9Wqfe-Tew",
  authDomain: "luton-6797c.firebaseapp.com",
  projectId: "luton-6797c",
  storageBucket: "luton-6797c.appspot.com", 
  messagingSenderId: "666830502112",
  appId: "1:666830502112:web:e301c045b7a63c23c2b885"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics only on client side
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);


export { app, analytics };
