export function AppFooter() {
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <p>&copy; 2023 My Application</p>
                <nav className="footer-links">
                    <a href="/privacy" className="footer-link">Privacy Policy</a>
                    <a href="/terms" className="footer-link">Terms of Service</a>
                </nav>
            </div>
        </footer>
    );
}