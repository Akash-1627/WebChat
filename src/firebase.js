// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYl-UE7iCFi6jxKx_78V2hoiW3A3LiFGU",
    authDomain: "test-aa172.firebaseapp.com",
    projectId: "test-aa172",
    storageBucket: "test-aa172.appspot.com",
    messagingSenderId: "329252574544",
    appId: "1:329252574544:web:92a0a15ded0db6d9d34855"
  };
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
