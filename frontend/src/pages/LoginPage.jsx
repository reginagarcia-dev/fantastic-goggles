import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const result = await login({ email, password });
      localStorage.setItem("token", result.token);
      navigate("/tasks");
    } catch {
      setError("Invalid credentials. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Login</h1>
        <p className="subtitle">Sign in to view your task list.</p>
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
          autoComplete="current-password"
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <p className="hint">
        Need an account? <Link to="/register">Create one</Link>
      </p>
    </div>
  );
}
