import "./nav.css"

function Nav() {
    return (
        <nav className="navbar">
            <h2>Cartify</h2>

            <ul className="nav-links">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>

            <div className="nav-actions">
                <div className="nav-item nav-cart" role="button" aria-label="cart">
                    <span className="nav-icon" role="img" aria-label="cart">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 6h15l-1.5 9h-13z"></path>
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="18" cy="21" r="1"></circle>
                            <path d="M6 6l-2-4"></path>
                        </svg>
                    </span>
                    <span className="nav-count">3</span>
                </div>
                <div className="nav-item nav-profile" role="button" aria-label="profile">
                    <span className="nav-icon" role="img" aria-label="profile">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </span>
                </div>
            </div>
        </nav>
    )
}

export default Nav