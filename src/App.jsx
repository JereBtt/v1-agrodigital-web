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
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-lg border-0 text-center p-4" style={{ width: 320, borderRadius: 16 }}>

          <div style={{ fontSize: 40 }}>🌾</div>
          <h4 className="fw-bold text-success mb-3">AgroDigital</h4>

          <div className="d-flex justify-content-center mb-3">
            <div className="spinner-border text-success" role="status"></div>
          </div>

          <div className="text-muted">Cargando...</div>

        </div>
      </div>
    );
  }

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
          Volver al Login
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
          Volver al Login
        </button>
      </div>
    );
  }

  // Si todo OK => Dashboard (le pasamos sesión y perfil)
  return <DashboardPage authUser={authUser} profile={profile} />;
}