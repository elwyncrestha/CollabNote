import { AppState } from '../../state';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const { updateState, saveState } = AppState;

/**
 * Ref: [XMLHttpRequest - Web APIs | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
 */
function fetchFirebaseConfig() {
  return new Promise((resolve, reject) => {
    // Uses private Postman mock server to fetch the config dynamically.
    const url =
      'https://04f71abc-0789-4a51-9087-0d18c0b34dcf.mock.pstmn.io/config';
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          // Your web app's Firebase configuration
          // For Firebase JS SDK v7.20.0 and later, measurementId is optional
          // Set the `firebaseConfig` property locally only if the config API is unavailable.
          // This is done to not expose the API keys.
          const firebaseConfig = {
            apiKey: '',
            authDomain: '',
            projectId: '',
            storageBucket: '',
            messagingSenderId: '',
            appId: '',
            measurementId: '',
          };

          resolve({ ...firebaseConfig, ...response });
        } catch (error) {
          reject(new Error('Failed to parse Firebase configuration'));
        }
      } else {
        reject(new Error('Failed to fetch Firebase configuration'));
      }
    };

    xhr.onerror = function () {
      reject(new Error('Error fetching data'));
    };

    xhr.send();
  });
}

/**
 * [Manage Users in Firebase](https://firebase.google.com/docs/auth/web/manage-users)
 */
export function initAuthStateSubscription() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      updateState({ authUser: user });
      console.log('SIGNED IN');
    } else {
      updateState({ authUser: null });
      console.log('SIGNED OUT');
    }
    saveState();
  });
}


// Initialize Firebase
export async function init() {
  const firebaseConfig = await fetchFirebaseConfig();
  const firebaseApp = initializeApp(firebaseConfig);
  const gaAnalytics = getAnalytics(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  updateState({ firebaseApp, gaAnalytics, firestore });
  initAuthStateSubscription();
}
