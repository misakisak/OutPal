import { getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// const firebaseConfig = {
//      apiKey: "AIzaSyAjhaKYI3CKPA8thTKWaCXURrh9c6ro78U",
//      authDomain: "authentication-54034.firebaseapp.com",
//      projectId: "authentication-54034",
//      storageBucket: "authentication-54034.appspot.com",
//      messagingSenderId: "432112843981",
//      appId: "1:432112843981:web:ba436deaab71436226fd84"
// };
const firebaseConfig = {
     apiKey: "AIzaSyAGi56EIWIYb4lPQQmPL5wa_vimjB9KjYQ",
     authDomain: "outpal-ed7db.firebaseapp.com",
     projectId: "outpal-ed7db",
     storageBucket: "outpal-ed7db.appspot.com",
     messagingSenderId: "359965415413",
     appId: "1:359965415413:web:00d838d71ad6e4af0d72bc"
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