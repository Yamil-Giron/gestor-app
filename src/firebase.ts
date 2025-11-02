import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyCFdzhCb7WUkj0oBITm3PkQGKZx9JGjjJM",
    authDomain: "gestorapp-5c91d.firebaseapp.com",
    projectId: "gestorapp-5c91d",
    storageBucket: "gestorapp-5c91d.firebasestorage.app",
    messagingSenderId: "305061241521",
    appId: "1:305061241521:web:61e674e219024164af7890"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const functions = getFunctions(app);
