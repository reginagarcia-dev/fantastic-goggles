import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await register({ email, password });
      localStorage.setItem("token", result.token);
      navigate("/tasks");
    } catch {
      setError("Could not create account. Try another email.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Register</h1>
        <p className="subtitle">Create your account to manage tasks.</p>
      </header>

      <form onSubmit={onSubmit} className="auth-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="new-password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          autoComplete="new-password"
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <p className="hint">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}
