import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAZyDT95Q_BBQ2m-aL-wd9av_BJiK8Rl7s",
  authDomain: "netflix-clone-31063.firebaseapp.com",
  projectId: "netflix-clone-31063",
  storageBucket: "netflix-clone-31063.firebasestorage.app",
  messagingSenderId: "245967118172",
  appId: "1:245967118172:web:55094e9ecc5921438a6b99",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth.email, password);
    const user = res.user;

    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert(error);
  }
};

const logout = () => {
  signOut;
  auth;
};

export { auth, db, login, signup, logout };
