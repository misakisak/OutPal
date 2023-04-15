// import { getApps, initializeApp } from '@react-native-firebase/app'
// import { getAuth } from '@react-native-firebase/auth'
import { getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
     apiKey: "AIzaSyAjhaKYI3CKPA8thTKWaCXURrh9c6ro78U",
     authDomain: "authentication-54034.firebaseapp.com",
     projectId: "authentication-54034",
     storageBucket: "authentication-54034.appspot.com",
     messagingSenderId: "432112843981",
     appId: "1:432112843981:web:ba436deaab71436226fd84"
};

let app;
if (getApps().length === 0) {
     app = initializeApp(firebaseConfig);
} else {
     app = getApps()[0];
}
const db = getFirestore(app);
const storage = getStorage(app);

const auth = getAuth(app);
export { app, auth, db, storage };