// Import Firebase functions
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Store Firebase credentials in an environment variable (Recommended)
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
console.log(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

// Google Sign-In with Popup
export const signInWithGooglePopup = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User signed in:", result.user);
    return result;
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

// Google Sign-In with Redirect (Proper function)
export const signInWithGoogleRedirect = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error("Error during redirect sign-in:", error);
  }
};

// Firestore Database
export const db = getFirestore();

// Create or Retrieve User Document
export const createUserDocFromAuth = async (
  userAuth,
  additionalInformation = { displayName: "Ranjit" }
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        additionalInformation,
      });
      console.log("User document created successfully!");
    } catch (error) {
      console.error("Error creating user document:", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
