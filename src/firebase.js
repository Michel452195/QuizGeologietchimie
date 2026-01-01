// Import the functions you need from the SDKs you need (modular v9+)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// NOTE: Keep these values as provided by your Firebase console.
const firebaseConfig = {
  apiKey: "AIzaSyB_2K7OieTv3_7jfgtzZBm94CqsOCbSI-U",
  authDomain: "quiz-react-80125.firebaseapp.com",
  projectId: "quiz-react-80125",
  // storageBucket should normally use the format: <projectId>.appspot.com
  storageBucket: "quiz-react-80125.appspot.com",
  messagingSenderId: "524795051812",
  appId: "1:524795051812:web:ea2a49986abf49ac06bdb1"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services used by the app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// If you add other Firebase products, initialize and export them here.