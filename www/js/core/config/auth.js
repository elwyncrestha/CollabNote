import { AppState } from '../state';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';

const { getState } = AppState;

export function isAuthenticated() {
  const { authUser } = getState();
  return !!authUser;
}

export async function signUp(email, password) {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function signIn(email, password) {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    /* Signed in */
    return userCredential;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function signOut() {
  const auth = getAuth();
  try {
    await firebaseSignOut(auth);
  } catch (e) {
    console.error(e);
    throw e;
  }
}
