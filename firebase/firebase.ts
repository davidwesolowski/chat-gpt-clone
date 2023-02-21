// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL9-IWptVm7rE7Md_yWdxPT4IoeUV5ESg",
  authDomain: "chat-gpt-clone-121a0.firebaseapp.com",
  projectId: "chat-gpt-clone-121a0",
  storageBucket: "chat-gpt-clone-121a0.appspot.com",
  messagingSenderId: "95426597763",
  appId: "1:95426597763:web:836ea0e42fffa2ef249cb6"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);