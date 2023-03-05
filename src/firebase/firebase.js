// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBqfheGLjljP16gFhYZXT5Lp7s2Mpt4a3U",
  authDomain: "moviesreview-53efa.firebaseapp.com",
  projectId: "moviesreview-53efa",
  storageBucket: "moviesreview-53efa.appspot.com",
  messagingSenderId: "574513817138",
  appId: "1:574513817138:web:d9a578697258e727b4fe2b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db,"movies");
export const reviewsRef = collection(db,"reviews");
export const usersRef = collection(db,"users");
export default app;