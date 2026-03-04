// Funciones de acceso a datos (Firestore) relacionadas al perfil del usuario.

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Lee el documento usuarios/{uid}. Devuelve null si no existe.
export async function getUserProfile(uid) {
    const ref = doc(db, "usuarios", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    // id = uid del documento
    return { id: snap.id, ...snap.data() };
}