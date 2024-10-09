// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-b73df.firebaseapp.com",
    projectId: "mern-auth-b73df",
    storageBucket: "mern-auth-b73df.appspot.com",
    messagingSenderId: "588216612044",
    appId: "1:588216612044:web:d7553597c1625dbd54fe69"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); 