import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKey,
  authDomain: process.env.NEXT_PUBLIC_AuthDomain,
  projectId: process.env.NEXT_PUBLIC_ProjectId,
  storageBucket: process.env.NEXT_PUBLIC_StorageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_MessagingSenderId,
  appId: process.env.NEXT_PUBLIC_AppId,
  measurementId: process.env.NEXT_PUBLIC_measurementId,
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const colRef = collection(db, "notes");

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
