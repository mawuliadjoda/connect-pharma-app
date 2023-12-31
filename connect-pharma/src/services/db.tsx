import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

const firebaseConfig = {

    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}
const app = initializeApp(firebaseConfig);
export const getDb = () => {
    return getFirestore(app);
}

const db = getFirestore(app);

const auth = getAuth(app);

export default app;


// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);


const logout = () => {
    localStorage.removeItem("user");
    signOut(auth);
    auth.signOut();
};


export {
    auth,
    db,
    // signInWithGoogle,
    logout,
};