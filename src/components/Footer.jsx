export default function Footer() {
    // Obtener el año actual para mostrar en el pie de página.
    const year = new Date().getFullYear();

    return (
        <footer className="bg-light border-top mt-auto">
            <div className="container py-3">
                <div className="row gy-2 align-items-center">
                    <div className="col-12 col-md-6">
                        <div className="fw-semibold">Institución Cervantes</div>
                        <div className="text-muted small">
                            Analista de Sistemas de Computación — {year}
                        </div>
                    </div>

                    <div className="col-12 col-md-6 text-md-end">
                        <div className="text-muted small">
                            Equipo: Bonetto Jeremias · Santander Alejandro · Miranda Facundo ·
                            Foronte Sofia · Lopez Guillermo
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}