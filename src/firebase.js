import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const {
  REACT_APP_apiKey: apiKey,
  REACT_APP_authDomain: authDomain,
  REACT_APP_databaseURL: databaseURL,
  REACT_APP_projectId: projectId,
  REACT_APP_storageBucket: storageBucket,
  REACT_APP_messagingSenderId: messagingSenderId,
  REACT_APP_appId: appId,
  REACT_APP_measurementId: measurementId,
} = process.env;

export const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
