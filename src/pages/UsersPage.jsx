// Pantalla/Componente de gestión de usuarios:
// - Lista usuarios
// - Permite cambiar rol (idRol)
// - Permite activar/desactivar (activo)
// Nota: crear usuarios (Auth) se hace manual desde consola para el MVP.

import { useEffect, useState } from "react";
import { getAllUsuarios, updateUsuario } from "../api/usuariosApi";
import { ROLES, tipoDocLabel } from "../data/catalogs";

export default function UsersPage({ currentUid }) {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState("");

    const load = async () => {
        setError("");
        try {
            const data = await getAllUsuarios();
            setUsuarios(data);
        } catch (e) {
            console.error(e);
            setError("No se pudieron cargar usuarios.");
        }
    };

    useEffect(() => {
        load();
    }, []);

    // Cambia rol (si no está bloqueado)
    const handleChangeRol = async (uid, idRol) => {
        await updateUsuario(uid, { idRol: Number(idRol) });
        await load();
    };

    // Activa/Desactiva (si no está bloqueado)
    const handleToggleActivo = async (u) => {
        await updateUsuario(u.id, { activo: !u.activo });
        await load();
    };

    return (
        <div>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Mail</th>
                            <th>Doc</th>
                            <th>Rol</th>
                            <th>Activo</th>
                            <th>Acción</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios.map((u) => {
                            // ✅ Regla: no me puedo modificar a mí mismo (si soy OWNER)
                            const esMiUsuario = u.id === currentUid;

                            return (
                                <tr key={u.id}>
                                    <td>{u.nombre} {u.apellido}</td>
                                    <td>{u.mail}</td>
                                    <td>{tipoDocLabel(u.idTipoDoc)} {u.dni || "-"}</td>

                                    <td style={{ minWidth: 180 }}>
                                        <select
                                            className="form-select"
                                            value={u.idRol}
                                            onChange={(e) => handleChangeRol(u.id, e.target.value)}
                                            disabled={esMiUsuario} // ✅ bloqueo cambio de rol propio
                                            title={esMiUsuario ? "No podés cambiar tu propio rol" : ""}
                                        >
                                            {ROLES.map((r) => (
                                                <option key={r.id} value={r.id}>
                                                    {r.valor}
                                                </option>
                                            ))}
                                        </select>
                                    </td>

                                    <td>
                                        <span className={u.activo ? "badge text-bg-success" : "badge text-bg-secondary"}>
                                            {u.activo ? "Sí" : "No"}
                                        </span>
                                    </td>

                                    <td>
                                        <button
                                            className={`btn btn-sm ${u.activo ? "btn-warning" : "btn-success"}`}
                                            onClick={() => handleToggleActivo(u)}
                                            disabled={esMiUsuario} // ✅ bloqueo baja propia
                                            title={esMiUsuario ? "No podés desactivarte a vos mismo" : ""}
                                        >
                                            {u.activo ? "Desactivar" : "Activar"}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        {usuarios.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center text-muted py-4">
                                    No hay usuarios para mostrar.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="text-muted small">
                <p>
                    <b>Regla de seguridad:</b> el jefe productor no puede darse de baja ni cambiarse el rol a sí mismo,
                    para evitar quedarse sin administrador.</p>
                <p>
                    <b>Nota MVP:</b> el alta de usuarios (email/contraseña) se realiza desde Firebase Authentication.
                    Luego se crea/edita el perfil en Firestore.
                </p>
            </div>
        </div>
    );
}
