import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hashPassword } from "../utils/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError(false);
    setSubmitting(true);

    try {
      const savedUser = localStorage.getItem("estateProUser");
      if (!savedUser) {
        setError(true);
        setMessage("No demo account found. Please create an account first.");
        return;
      }

      const user = JSON.parse(savedUser);
      const enteredHash = await hashPassword(password);
      const emailMatches = user.email?.trim().toLowerCase() === email.trim().toLowerCase();
      const passwordMatches = user.passwordHash && user.passwordHash === enteredHash;

      if (!emailMatches || !passwordMatches) {
        setError(true);
        setMessage("The email or password is incorrect. If you created an account before this update, please sign up again.");
        return;
      }

      localStorage.setItem("estateProLoggedIn", JSON.stringify({ name: user.name, email: user.email }));
      setMessage("Demo login successful. Opening the home page…");
      window.setTimeout(() => navigate("/", { replace: true }), 700);
    } catch {
      setError(true);
      setMessage("Could not verify your demo account. Please sign up again and try once more.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">
        <p className="section-label">YOUR NEXT HOME STARTS HERE</p>
        <h1>Welcome Back</h1>
        <p>Log in to your EstatePro demo account.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email Address</label>
          <input id="login-email" type="email" autoComplete="email" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} required />

          <label htmlFor="login-password">Password</label>
          <input id="login-password" type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required />

          <button type="submit" className="primary-btn" disabled={submitting}>{submitting ? "Checking…" : "Login"}</button>
        </form>
        {message && <p className={`form-message ${error ? "form-message-error" : "form-message-success"}`} role="status">{message}</p>}
        <p className="auth-footer">Don't have an account? <Link to="/signup">Sign Up</Link></p>
        <p className="demo-notice">Demo only: account data is stored in this browser. This is not secure production authentication.</p>
      </div>
    </section>
  );
}

export default Login;
