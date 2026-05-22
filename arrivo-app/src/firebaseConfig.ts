import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClUPwFi2Z44Bimj-wCuvN8L1mL8A2R7Vw",
  authDomain: "arrivo-402f6.firebaseapp.com",
  projectId: "arrivo-402f6",
  storageBucket: "arrivo-402f6.firebasestorage.app",
  messagingSenderId: "91718050578",
  appId: "1:91718050578:web:96bd080a96127c4b6c89cb"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);