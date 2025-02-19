// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv8gRCUT9vq7AJuUWI7vkqNGMKVh_cOnM",
  authDomain: "crown-clothing-db-9eefe.firebaseapp.com",
  projectId: "crown-clothing-db-9eefe",
  storageBucket: "crown-clothing-db-9eefe.firebasestorage.app",
  messagingSenderId: "190347550514",
  appId: "1:190347550514:web:7c4505e0d5fb6fee9b412b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in:", result.user);
    return result;
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "user", userAuth.uid);

  console.log(userDocRef);
  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot.exists());

  if (!userSnapShot.exists) {
    const { dispayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { dispayName, email, createdAt });
    } catch (error) {
      console.log("Error Creating User ", error.message);
    }
  }
  return userDocRef;
};
