import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext, ACTIONS } from "../context/AppContext";
import "./Auth.css";

export default function Login() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  function validate() {
    const errs = {};
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address.";
    if (!form.password) errs.password = "Password is required.";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    // Verify credentials against users list before dispatching
    const matchedUser = state.users.find(
      (u) => u.email === form.email && u.password === form.password
    );
    if (!matchedUser) {
      setServerError("Invalid email or password. Please try again.");
      return;
    }

    dispatch({ type: ACTIONS.LOGIN, payload: form });
    navigate("/");
  }

  return (
    <div className="auth-page">
      <div className="auth-card glass-card">
        <div className="auth-header">
          <span className="auth-icon">🔐</span>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue your journey</p>
        </div>

        {serverError && <div className="auth-error-banner">{serverError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="alex@fitness.com"
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="auth-submit">
            Sign In
          </button>
        </form>

        <p className="auth-switch">
          Don&apos;t have an account?{" "}
          <Link to="/register">Create one</Link>
        </p>

        <div className="auth-hint">
          <strong>Demo user:</strong> alex@fitness.com / password123
        </div>
      </div>
    </div>
  );
}
