// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCcnqxodtRmg51W9g-_vRotCnWAPgYHisc",
  authDomain: "netflix-clone-91f61.firebaseapp.com",
  projectId: "netflix-clone-91f61",
  storageBucket: "netflix-clone-91f61.appspot.com",
  messagingSenderId: "445288314490",
  appId: "1:445288314490:web:b42579bbe40c6292916dc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signUp, logout };
