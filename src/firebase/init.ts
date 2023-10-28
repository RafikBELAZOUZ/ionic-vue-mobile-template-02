import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updatePassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect  } from 'firebase/auth'

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
console.log(firebaseApp)

// init firestore service
export const db = getFirestore()
export const auth = getAuth(firebaseApp)

export const signInEmailAndPassword = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log("Current User : " )
        console.log(auth.currentUser)
        return userCredential.user;
      })
      .catch(error => {
        console.error("Authentication Error : " + error)
      });
}

export const signInGoogle = async () => {
  const provider = new GoogleAuthProvider()
  await signInWithRedirect(auth, provider)
      .then(userCredential => {
        console.log("Current User : " )
        console.log(auth.currentUser)
        return userCredential;
      })
      .catch(error => {
        console.error("Authentication Error : " + error)
      });
}

export const createUserEmailAndPassword = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log("User Created : " )
        console.log(auth.currentUser)
        return userCredential.user;
      })
      .catch(error => {
        console.error("Authentication Error : " + error)
      });
}

export const logout = async () => {
  await signOut(auth)
      .then(userCredential => {
        console.log("User Signed out" )
        return true;
      })
      .catch(error => {
        console.error("Authentication Error : " + error)
      });
}

// export const onAuthChanged = async () => {
//   await onAuthStateChanged(auth)
//     .then((user: any) => {
//       if (user) {
//         // User is signed in
//       } else {
//         // User is signed out
//       }
//   });
// }
