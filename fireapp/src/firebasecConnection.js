import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3Mvsk3W0PclybaHSYvbI1o-UTQD94IA4",
  authDomain: "curso-bd81d.firebaseapp.com",
  projectId: "curso-bd81d",
  storageBucket: "curso-bd81d.firebasestorage.app",
  messagingSenderId: "153532750614",
  appId: "1:153532750614:web:7c82c7aeb7cfa19f9ece37",
  measurementId: "G-95QVG2S7E7"
};

const firebaseApp = initializeApp(firebaseConfig);//inicializando Firebase

const db = getFirestore(firebaseApp);//get para ter a conexão com o banco.

export { db };