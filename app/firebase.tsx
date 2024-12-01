// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,EmailAuthProvider} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHJuhKPdF9-9MylCGrgGLmlBe3X4_fm9c",
  authDomain: "chibi-sumou-project.firebaseapp.com",
  projectId: "chibi-sumou-project",
  storageBucket: "chibi-sumou-project.firebasestorage.app",
  messagingSenderId: "183330962058",
  appId: "1:183330962058:web:4fc7b5b6e0619b54584b73",
  measurementId: "G-Q547VNMBGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new EmailAuthProvider();
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export {auth,provider,db};