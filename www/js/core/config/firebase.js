import {AppState} from '../state';
// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

async function fetchFirebaseConfig() {
    // Uses private Postman mock server to fetch the config dynamically.
    const url = 'https://04f71abc-0789-4a51-9087-0d18c0b34dcf.mock.pstmn.io/config';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch Firebase configuration');
        }

        // Set the `firebaseConfig` property locally only if the config API is unavailable.
        // This is done to not expose the API keys.
        const firebaseConfig = {
            apiKey: "",
            authDomain: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: "",
            appId: "",
            measurementId: ""
        };

        const config = await response.json();

        return { ...firebaseConfig, ...config };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

const { getState, setState } = AppState;

// Initialize Firebase
export default async function init() {
    const firebaseConfig = await fetchFirebaseConfig();
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    
    const state = getState();
    state.firebaseApp = app;
    state.gaAnalytics = analytics;
    setState(state);
}
