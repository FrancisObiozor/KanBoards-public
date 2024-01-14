import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

let firebaseSettings = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const setFirebaseSettingsFromBackend = (backendSettings) => {
  firebaseSettings.apiKey = backendSettings.apiKey;
  firebaseSettings.authDomain = backendSettings.authDomain;
  firebaseSettings.projectId = backendSettings.projectId;
  firebaseSettings.storageBucket = backendSettings.storageBucket;
  firebaseSettings.messagingSenderId = backendSettings.messagingSenderId;
  firebaseSettings.appId = backendSettings.appId;
};

const app = initializeApp(firebaseSettings);

export const auth = getAuth(app);
export default app;
