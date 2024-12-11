//firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyCdGgtw9X-rlsIdow_1YGz5uyxHwa0_pA4",
  authDomain: "maximus-f2f81.firebaseapp.com",
  projectId: "maximus-f2f81",
  storageBucket: "maximus-f2f81.firebasestorage.app",
  messagingSenderId: "1014379419644",
  appId: "1:1014379419644:web:4d15c9c5ff9d90486bc479",
  measurementId: "G-MNJ9PXH8RV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);

export { db };
