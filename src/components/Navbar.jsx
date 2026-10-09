import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={closeMenu} aria-label="EstatePro home">
          Estate<span>Pro</span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="primary-navigation" className={`nav-links${menuOpen ? " nav-links-open" : ""}`}>
          <NavLink to="/" onClick={closeMenu} end>Home</NavLink>
          <NavLink to="/properties" onClick={closeMenu}>Properties</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          <div className="mobile-nav-actions">
            <Link to="/login" className="login-btn" onClick={closeMenu}>Login</Link>
            <Link to="/signup" className="signup-btn" onClick={closeMenu}>Sign Up</Link>
          </div>
        </nav>

        <div className="nav-buttons">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
