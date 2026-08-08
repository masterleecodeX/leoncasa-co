import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, collection, getDocs, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmvDbTdrR9dKvi8HgaK3w0g12TK4eSwxk",
  authDomain: "project-53d2ce76-a924-4752-a11.firebaseapp.com",
  projectId: "project-53d2ce76-a924-4752-a11",
  storageBucket: "project-53d2ce76-a924-4752-a11.firebasestorage.app",
  messagingSenderId: "225122285461",
  appId: "1:225122285461:web:7c0f42c9fa567d6135289c"
};

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {}, "ai-studio-furniturewebsite-be1c2410-2e50-44bb-8043-67c16870853f");
export const auth = getAuth(app);
