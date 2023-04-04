import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyAu74cNK9QdQDaLDeml4hXCN9q_yrNxTiU",
  authDomain: "our-project1.firebaseapp.com",
  projectId: "our-project1",
  storageBucket: "our-project1.appspot.com",
  messagingSenderId: "860443639463",
  appId: "1:860443639463:web:8974a7b1eeed6bd1962582",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const usersRef = collection(db, "users");
export const tasksRef = collection(db, "tasks");

export const imageListRef = ref(storage, "avatars/");
export const provider = new GoogleAuthProvider();
export default app;
