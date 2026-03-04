// DashboardPage usa AppLayout (Header + Footer) y muestra info básica.
// Si el usuario es OWNER, muestra acceso a la gestión de usuarios.

import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import AppLayout from "../layouts/AppLayout";

import UsersPage from "./UsersPage";
import { rolLabel, tipoDocLabel } from "../data/catalogs";

export default function DashboardPage({ authUser, profile }) {
    // Logout: cierra la sesión en Firebase Auth
    const handleLogout = async () => {
        await signOut(auth);
    };

    const esOwner = profile.idRol === 1;

    return (
        <AppLayout userEmail={authUser.email} onLogout={handleLogout}>
            <div className="card shadow border-0 mb-4">
                <div className="card-body">
                    <h2 className="mb-2">Dashboard</h2>

                    <div className="text-muted">
                        <div><b>Nombre:</b> {profile.nombre} {profile.apellido}</div>
                        <div><b>Rol:</b> {rolLabel(profile.idRol)}</div>
                        <div><b>Documento:</b> {tipoDocLabel(profile.idTipoDoc)} {profile.dni || "-"}</div>
                        <div><b>Teléfono:</b> {profile.telefono || "-"}</div>
                    </div>
                </div>
            </div>

            {esOwner && (
                <div className="card shadow border-0">
                    <div className="card-body">
                        <h4 className="mb-3">Gestión de usuarios (OWNER)</h4>
                        <UsersPage currentUid={authUser.uid} />
                    </div>
                </div>
            )}
        </AppLayout>
    );
}