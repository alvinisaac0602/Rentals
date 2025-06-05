// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "space-estates.firebaseapp.com",
  projectId: "space-estates",
  storageBucket: "space-estates.firebasestorage.app",
  messagingSenderId: "967577111288",
  appId: "1:967577111288:web:befa6360ea81bb6559490d",
  measurementId: "G-G7MS8JPZDY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { app };
