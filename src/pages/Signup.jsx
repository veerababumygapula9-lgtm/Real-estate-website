import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hashPassword } from "../utils/auth";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError(false);
    setSubmitting(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      if (name.trim().length < 2) {
        setError(true);
        setMessage("Please enter your full name.");
        return;
      }
      if (password.length < 8) {
        setError(true);
        setMessage("Your password must contain at least 8 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setError(true);
        setMessage("The passwords do not match.");
        return;
      }

      const existingUser = localStorage.getItem("estateProUser");
      if (existingUser) {
        const parsedUser = JSON.parse(existingUser);
        if (parsedUser.email?.trim().toLowerCase() === normalizedEmail) {
          setError(true);
          setMessage("An account with this email already exists. Please log in.");
          return;
        }
      }

      const passwordHash = await hashPassword(password);
      localStorage.setItem("estateProUser", JSON.stringify({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash
      }));
      setMessage("Demo account created. Redirecting you to login…");
      window.setTimeout(() => navigate("/login", { replace: true }), 900);
    } catch {
      setError(true);
      setMessage("Your browser could not create the demo account. Please use localhost or HTTPS and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">
        <p className="section-label">WELCOME TO ESTATEPRO</p>
        <h1>Create Account</h1>
        <p>Join us to discover your next home.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="signup-name">Full Name</label>
          <input id="signup-name" type="text" autoComplete="name" placeholder="Enter your full name" value={name} onChange={(event) => setName(event.target.value)} required minLength={2} />

          <label htmlFor="signup-email">Email Address</label>
          <input id="signup-email" type="email" autoComplete="email" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} required />

          <label htmlFor="signup-password">Password</label>
          <input id="signup-password" type="password" autoComplete="new-password" placeholder="At least 8 characters" value={password} onChange={(event) => setPassword(event.target.value)} minLength={8} required />

          <label htmlFor="signup-confirm-password">Confirm Password</label>
          <input id="signup-confirm-password" type="password" autoComplete="new-password" placeholder="Re-enter your password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} minLength={8} required />

          <button type="submit" className="primary-btn" disabled={submitting}>{submitting ? "Creating…" : "Create Account"}</button>
        </form>
        {message && <p className={`form-message ${error ? "form-message-error" : "form-message-success"}`} role="status">{message}</p>}
        <p className="auth-footer">Already have an account? <Link to="/login">Login</Link></p>
        <p className="demo-notice">Demo only: the password is hashed before browser storage, but browser storage is not secure authentication.</p>
      </div>
    </section>
  );
}

export default Signup;
