import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AppLayout({ children, userEmail, onLogout }) {
    return (
        <div className="min-vh-100 d-flex flex-column">
            {/* El Header recibe el email del usuario autenticado y la función para cerrar sesión. */}
            <Header userEmail={userEmail} onLogout={onLogout} />

            <main className="container flex-grow-1 py-4">
                {children}
            </main>

            <Footer />
        </div>
    );
}