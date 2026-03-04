// App.jsx decide qué pantalla mostrar según:
// 1) Si hay sesión (Firebase Auth)
// 2) Si existe perfil en Firestore (usuarios/{uid})
// 3) Si el usuario está activo o no

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

import { getUserProfile } from "./api/profileApi";

export default function App() {
  // authUser = usuario autenticado por Firebase (email, uid, etc.)
  const [authUser, setAuthUser] = useState(null);

  // profile = datos de negocio en Firestore (nombre, rol, activo, etc.)
  const [profile, setProfile] = useState(null);

  // loading = evita parpadeos mientras resolvemos sesión/perfil
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener de Firebase Auth: se dispara al loguear/desloguear
    const unsub = onAuthStateChanged(auth, async (u) => {
      setAuthUser(u);

      // Si no hay usuario, limpiamos perfil y terminamos.
      if (!u) {
        setProfile(null);
        setLoading(false);
        return;
      }

      // Si hay usuario, buscamos su perfil en Firestore
      setLoading(true);
      const p = await getUserProfile(u.uid);
      setProfile(p);
      setLoading(false);
    });

    // Cleanup: evita listeners duplicados
    return () => unsub();
  }, []);

  // Mientras carga, mostramos feedback
  if (loading) return <p className="text-center mt-5">Cargando...</p>;

  // Si no hay sesión => Login
  if (!authUser) return <LoginPage />;

  // Si hay sesión pero no hay perfil en Firestore:
  // (Muy común en MVP si creaste el usuario en Auth y te olvidaste el doc en Firestore)
  if (!profile) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          Tu cuenta existe en Authentication pero no tiene perfil en Firestore.
          <br />
          Falta crear: <b>usuarios/{authUser.uid}</b>
        </div>

        <button
          className="btn btn-danger mt-3"
          onClick={() => signOut(auth)}
        >
          Volver al login
        </button>
      </div>
    );
  }

  // Si el perfil existe pero está desactivado => bloqueamos acceso
  if (profile.activo === false) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Tu usuario está desactivado. Contactá al administrador.
        </div>

        <button
          className="btn btn-danger mt-3"
          onClick={() => signOut(auth)}
        >
          Volver al login
        </button>
      </div>
    );
  }

  // Si todo OK => Dashboard (le pasamos sesión y perfil)
  return <DashboardPage authUser={authUser} profile={profile} />;
}