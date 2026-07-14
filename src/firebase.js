import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración que copiaste de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDp-xvXLs9DWc9z-BcOryVyps_SrPG2n-g",
  authDomain: "fleettrack-48567.firebaseapp.com",
  projectId: "fleettrack-48567",
  storageBucket: "fleettrack-48567.firebasestorage.app",
  messagingSenderId: "574428326069",
  appId: "1:574428326069:web:86d9ab25af347e455736fc",
  measurementId: "G-RWSZ60QDT0"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore (esta es la base de datos)
export const db = getFirestore(app);