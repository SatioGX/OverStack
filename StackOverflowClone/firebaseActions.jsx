import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirebaseConfig } from './firebaseconfig';

const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);

export const signInUser = async (email, password) => {
  if (!email || !password) return;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    // Handle authentication error here if needed
    console.error('Error signing in:', error);
    throw error;
  }
};

export const userStateListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const SignOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    // Handle sign out error here if needed
    console.error('Error signing out:', error);
    throw error;
  }
};
