import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAa0fbizXfucjDX2UXTk6vNQseT-MLwBMY",
    authDomain: "wardah---qa-interview.firebaseapp.com",
    databaseURL: "https://wardah---qa-interview-default-rtdb.firebaseio.com",
    projectId: "wardah---qa-interview",
    storageBucket: "wardah---qa-interview.appspot.com",
    messagingSenderId: "1048597398077",
    appId: "1:1048597398077:web:d8e6fbfb04907483f4e054",
    measurementId: "G-5NCKX00Z13"
  };

// init firebase
const firebaseApp = initializeApp(firebaseConfig)

// init firestore service
export const db = getFirestore()
export const auth = getAuth(firebaseApp)

//connectFirestoreEmulator(db, '127.0.0.1', 8080);

console.log(firebaseApp)
console.log(db)
