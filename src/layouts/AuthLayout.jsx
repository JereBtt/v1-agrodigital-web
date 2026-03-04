export default function AuthLayout({ children }) {
    return (
        /*      
        d-flex + justify-content-center + align-items-center: centra
        */
        <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light p-3">
            {children}
        </div>
    );
}