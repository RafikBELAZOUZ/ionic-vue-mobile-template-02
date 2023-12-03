import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, addDoc, collection, doc, getDoc, getCountFromServer, setDoc } from "firebase/firestore";
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
//console.log(firebaseApp)

// init firestore service
export const db = getFirestore()
export const auth = getAuth(firebaseApp)

export const signInEmailAndPassword = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
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
  return await signInWithPopup(auth, provider)
      .then(userCredential => {
        console.log("Current User : " )
        console.log(userCredential.user)
        return userCredential.user
      })
      .catch(error => {
        console.error("Authentication Error : " + error)
      });
}

export const createUserEmailAndPassword = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password)
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

export const createDocument = async (myCollection: any, data: any) => {
    const number = await questionsNumber() + 1
    const docRef = await setDoc(doc(db, myCollection, number.toString()), data)
    console.log('Document was created with ID: ', docRef)
  }

export const getDocument = async (myCollection: any, data: any) => {
    const docSnap = await getDoc(doc(db, myCollection, data))

      if (docSnap.exists()) {
        console.log(docSnap.data())
      } else {
        console.log('Document does not exist')
      }
}

export const getRandomQuestion = async (myCollection: any) => {
    const number = await questionsNumber()
    const randomNumber = Math.floor(Math.random() * number)
    console.log(randomNumber.toString())
    const docSnap = await getDoc(doc(db, myCollection, randomNumber.toString()))

      if (docSnap.exists()) {
        console.log(docSnap.data())
      } else {
        console.log('Document does not exist')
      }
}

export const questionsNumber = async () => {
    const coll = collection(db, "QuestionsTest");
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count
  }

export const onAuthChanged = () => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.log("AUTH CHANGED POSITIF")
      console.log(user)
      localStorage.setItem("currentUser", JSON.stringify(user))
      return user
      // ...
    } else {
        console.log("AUTH CHANGED NEGATIF")
        localStorage.setItem("currentUser", "")
        return null
      // User is signed out
    }
  })
}

export const currentUser = "frf"
