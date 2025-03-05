import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocFromAuth,
} from "../../utils/firebase.utils";
import SignUpForm from "../../components/signup form/sign-up-form.component";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    try {
      const response = await signInWithGooglePopup();
      if (!response) return;

      const { user } = response;
      await createUserDocFromAuth(user);
      console.log("User Document Created:", user);
    } catch (error) {
      console.error("Error during Google popup sign-in:", error);
    }
  };

  const logGoogleRedirectUser = async () => {
    try {
      await signInWithGoogleRedirect(); // No need to handle user creation here
      console.log("Redirecting for Google Sign-In...");
    } catch (error) {
      console.error("Error during Google redirect sign-in:", error);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign In With Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
