import { useState, useEffect } from "react";

export default function EditUserModal({ show, user, onClose, onSave }) {
    // Estado local para manejar los datos del formulario
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        dni: ""
    });

    // Cada vez que se abre el modal o cambia el usuario, cargamos sus datos
    useEffect(() => {
        if (user) {
            setFormData({
                nombre: user.nombre || "",
                apellido: user.apellido || "",
                telefono: user.telefono || "",
                dni: user.dni || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(user.id, formData); // Enviamos el ID y los datos nuevos a UsersPage
    };

    // Si "show" es falso, no renderizamos nada
    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Perfil de Usuario</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {/* EMAIL (Bloqueado por reglas de Firebase Auth) */}
                            <div className="mb-3">
                                <label className="form-label text-muted">Mail (No editable por admin)</label>
                                <input type="email" className="form-control" value={user.mail} disabled />
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Apellido</label>
                                    <input type="text" className="form-control" name="apellido" value={formData.apellido} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">DNI</label>
                                    <input type="text" className="form-control" name="dni" value={formData.dni} onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Teléfono</label>
                                    <input type="text" className="form-control" name="telefono" value={formData.telefono} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}