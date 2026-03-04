export default function Header({ userEmail, onLogout }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container">
                <span className="navbar-brand fw-bold">
                    🌾 AgroDigital <span className="fw-normal">| MVP</span>
                </span>

                <div className="d-flex align-items-center gap-3">
                    <span className="badge text-bg-light">v1-agrodigital-web</span>

                    {userEmail && (
                        <span className="text-white small d-none d-md-inline">
                            {userEmail}
                        </span>
                    )}

                    {/* Si se pasó la función onLogout, mostrar el botón de salir. 
                    //*Esto permite reutilizar el Header en otras páginas sin necesidad de cerrar sesión. */}
                    {onLogout && (
                        <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
                            Cerrar sesión
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}