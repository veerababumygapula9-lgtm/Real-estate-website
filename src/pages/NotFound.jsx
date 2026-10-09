
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="section">
      <div className="container no-results">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="primary-btn">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;