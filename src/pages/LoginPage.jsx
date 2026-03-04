// Hook de React para manejar estado interno del componente.
import { useState } from "react";
// Función del SDK de Firebase Authentication.
import { signInWithEmailAndPassword } from "firebase/auth";
// Conexión con el proyecto Firebase.
import { auth } from "../firebase";
import AuthLayout from "../layouts/AuthLayout";

export default function LoginPage() {
    // Variables de estado mas función para actualizarlas.
    /*
     * mail: valor actual del input.
     * setMail: función para actualizar.
     * useState(""): valor inicial vacío.
     */
    const [mail, setMail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Función que se ejecuta al hacer submit en el formulario.
    // async; El programa no se queda congelado esperando la respuesta.
    // Es async porque vamos a esperar la respuesta de Firebase.
    const handleSubmit = async (e) => {
        // Evitar que el formulario recargue la página al hacer submit.
        e.preventDefault();
        // Limpiar error previo y mostrar indicador de carga.
        setError("");
        setLoading(true);

        // Manejo de errores. Evita que el programa se rompa.
        try {
            // Intentar iniciar sesión con Firebase Authentication usando mail y contraseña.
            await signInWithEmailAndPassword(auth, mail, contrasena);
        } catch (err) {
            // Mostrar mensaje de error al usuario en caso de fallo en login.
            console.error(err);
            setError("Mail o contraseña incorrectos.");
        } finally {
            // Siempre al finalizar ocultar indicador de carga.
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="card shadow-lg border-0" style={{ width: 420, borderRadius: 16 }}>
                <div className="card-body p-4">
                    <div className="text-center mb-4">
                        <div style={{ fontSize: 40 }}>🌾</div>
                        <h2 className="fw-bold text-success mb-1">AgroDigital</h2>
                        <div className="text-muted">Iniciá sesión para continuar</div>
                    </div>

                    {/* Mostrar mensaje de error si existe. */}
                    {error && <div className="alert alert-danger py-2">{error}</div>}

                    {/* Formulario de inicio de sesión */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Mail</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="usuario@empresa.com"
                                value={mail}
                                // Actualizar el estado 'mail' cada vez que el usuario escriba en el input.
                                onChange={(e) => setMail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="********"
                                value={contrasena}
                                // Actualizar el estado 'contrasena' cada vez que el usuario escriba en el input.
                                onChange={(e) => setContrasena(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success w-100 fw-bold"
                            style={{ borderRadius: 10 }}
                            disabled={loading}
                        >
                            {loading ? "Ingresando..." : "Ingresar"}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <small className="text-muted">v1-agrodigital-web</small>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}