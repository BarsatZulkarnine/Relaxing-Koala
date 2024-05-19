import { initializeApp } from 'firebase/app';
import { getFirestore  } from 'firebase/firestore';
import {getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC_xFPsoS7SgG-2HsaY8cdH8auwFZKLxm8",
  authDomain: "relaxing-koala.firebaseapp.com",
  projectId: "relaxing-koala",
  storageBucket: "relaxing-koala.appspot.com",
  messagingSenderId: "708374420759",
  appId: "1:708374420759:web:55f9330d94e8a7c715ab52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, db, storage };
