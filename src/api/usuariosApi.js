// Acceso a datos para la colección "usuarios"

import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// Devuelve todos los usuarios (solo lo debería poder ejecutar el OWNER por rules)
export async function getAllUsuarios() {
    const snap = await getDocs(collection(db, "usuarios"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Actualiza campos específicos de un usuario
export async function updateUsuario(uid, data) {
    const ref = doc(db, "usuarios", uid);
    await updateDoc(ref, data);
}