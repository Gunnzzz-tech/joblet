// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxHRTd_YdAn-1dBGKOzcWYfFea-kaaScg",
  authDomain: "joveo-project-hub.firebaseapp.com",
  projectId: "joveo-project-hub",
  storageBucket: "joveo-project-hub.firebasestorage.app",
  messagingSenderId: "689049293299",
  appId: "1:689049293299:web:ecd973c83b5f5461f60286",
  measurementId: "G-MYZXKSN6T4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in browser and with error handling
let analytics: Analytics | undefined;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Analytics not available:', error);
  }
}

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Enable offline persistence for Firestore
import { enableIndexedDbPersistence } from 'firebase/firestore';

// Enable offline persistence (optional but recommended)
try {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    }
  });
} catch (err) {
  console.warn('Persistence error:', err);
}

// Configure Google Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { analytics };
export default app;
