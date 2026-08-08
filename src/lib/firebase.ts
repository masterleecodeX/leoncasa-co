import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "project-53d2ce76-a924-4752-a11",
  appId: "1:225122285461:web:7c0f42c9fa567d6135289c",
  apiKey: "AIzaSyCmvDbTdrR9dKvi8HgaK3w0g12TK4eSwxk",
  authDomain: "project-53d2ce76-a924-4752-a11.firebaseapp.com",
  storageBucket: "project-53d2ce76-a924-4752-a11.firebasestorage.app",
  messagingSenderId: "225122285461"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
