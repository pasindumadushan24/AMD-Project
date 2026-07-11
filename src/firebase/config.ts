import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuJXuIbIEF7wckZzWA_CA9VdLw52gJWTk",
  authDomain: "quickmarketmobile.firebaseapp.com",
  projectId: "quickmarketmobile",
  storageBucket: "quickmarketmobile.firebasestorage.app",
  messagingSenderId: "933701627203",
  appId: "1:933701627203:web:d3172c492493e2b37ed3f6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
// firebase/config.ts හි
export const storage = getStorage(app); // සරලව මෙසේ තබන්න

export default app;