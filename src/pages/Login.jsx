import { useState } from "react";
import { Link } from "react-router-dom";
import { login, googleLogin, getUserProfile } from "../services/authService";
import useRoleRedirect from "../hooks/useRoleRedirect";
import "../stylesheets/Register.css";
import Googleimage from "../assets/images/google.svg";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const redirectByRole = useRoleRedirect();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      const userCredential = await login(form.email, form.password);
      const profile = await getUserProfile(userCredential.user.uid);

      redirectByRole(profile);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await googleLogin();
      const profile = await getUserProfile(userCredential.user.uid);

      redirectByRole(profile);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="register-page">
      <form className="register-card" onSubmit={handleSubmit} noValidate>
        <h1 className="register-title">Welcome Back</h1>
        <p className="register-subtitle">
          Fill in your details to get started.
        </p>

        <fieldset className="register-fields">
          <legend className="sr-only">Account details</legend>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="jane@company.com"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span id="email-error" className="field-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <span id="password-error" className="field-error" role="alert">
                {errors.password}
              </span>
            )}
          </div>
        </fieldset>

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? "Logging into account..." : "Login"}
        </button>

        <button
          type="button"
          className="submit-btn"
          onClick={handleGoogleSignIn}
        >
          <img src={Googleimage} className="btn-icon" alt="Google" />
          <span>Continue with Google</span>
        </button>

        <p className="register-footer">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </main>
  );
}