// Inicializa Firebase y expone servicios que usa el frontend:
// - auth: para login/logout
// - db: para leer/escribir en Firestore

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración desde variables de entorno (Vite).
// Estas variables se guardan en un archivo .env local (NO se sube al repo).
const firebaseConfig = {
    // API key definida directamente por problemas de lectura desde .env en desarrollo.
    apiKey: "AIzaSyA4Obrj_EG8zPAWQc5hB516BCpfhhoJjcA",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig);

console.log("API KEY raw:", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("API KEY length:", (import.meta.env.VITE_FIREBASE_API_KEY || "").length);
console.log("AUTH DOMAIN:", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);

// Servicio de autenticación (email/contraseña)
export const auth = getAuth(app);

// Servicio de base de datos (Firestore)
export const db = getFirestore(app);