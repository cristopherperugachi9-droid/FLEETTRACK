import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const registrarVehiculo = async (datos) => {
  try {
    return await addDoc(collection(db, "vehiculos"), datos);
  } catch (e) {
    console.error("Error:", e);
  }
};

export const obtenerVehiculos = async () => {
  const querySnapshot = await getDocs(collection(db, "vehiculos"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};