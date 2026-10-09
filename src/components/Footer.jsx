import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">

        <div>
          <h2 className="footer-logo">
            Estate<span>Pro</span>
          </h2>

          <p>
            Find your perfect home with our trusted real estate platform.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h3>Contact</h3>

          <p>Hyderabad, India</p>
          <p>+91 98765 43210</p>
          <p>info@estatepro.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 EstatePro. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;