import { useState } from "react";
import { register, googleLogin, getUserProfile } from "../services/authService";
import useRoleRedirect from "../hooks/useRoleRedirect";
import "../stylesheets/Register.css";
import Googleimage from "../assets/images/google.svg";

const ROLES = ["Client", "Freelancer"];

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password1: "",
    role: "",
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

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }

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

    if (!form.password1) {
      newErrors.password1 = "Please confirm your password.";
    } else if (form.password && form.password !== form.password1) {
      newErrors.password1 = "Passwords do not match.";
    }

    if (!form.role) {
      newErrors.role = "Please select a role.";
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
      await register(form.name, form.email, form.password, form.role);

      console.log("Registration successful");

      // We already know the role the user just picked - no need to
      // re-fetch the profile we just created.
      redirectByRole({ role: form.role });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrors((prev) => ({ ...prev, google: "" }));

    try {
      const userCredential = await googleLogin();
      const user = userCredential.user;

      const profile = await getUserProfile(user.uid);

      redirectByRole(profile);
    } catch (error) {
      console.error(error);

      if (error.code === "auth/popup-closed-by-user") {
        // User closed the popup themselves - no need to show an error.
        return;
      }

      setErrors((prev) => ({
        ...prev,
        google:
          error.code === "auth/popup-blocked"
            ? "Your browser blocked the Google sign-in popup. Please allow popups for this site and try again."
            : error.code === "auth/unauthorized-domain"
            ? "This domain isn't authorized for Google sign-in yet."
            : "Something went wrong signing in with Google. Please try again.",
      }));
    }
  };

  return (
    <main className="register-page">
      <form className="register-card" onSubmit={handleSubmit} noValidate>
        <h1 className="register-title">Create your account</h1>
        <p className="register-subtitle">
          Fill in your details to get started.
        </p>

        <fieldset className="register-fields">
          <legend className="sr-only">Account details</legend>

          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Jane Doe"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? "input-error" : ""}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <span id="name-error" className="field-error" role="alert">
                {errors.name}
              </span>
            )}
          </div>

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

          <div className="form-field">
            <label htmlFor="password1">Confirm password</label>
            <input
              id="password1"
              name="password1"
              type="password"
              placeholder="Confirm your password"
              value={form.password1}
              onChange={handleChange}
              className={errors.password1 ? "input-error" : ""}
              aria-invalid={errors.password1 ? "true" : "false"}
              aria-describedby={
                errors.password1 ? "password1-error" : undefined
              }
            />
            {errors.password1 && (
              <span id="password1-error" className="field-error" role="alert">
                {errors.password1}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              className={errors.role ? "input-error" : ""}
              aria-invalid={errors.role ? "true" : "false"}
              aria-describedby={errors.role ? "role-error" : undefined}
            >
              <option value="" disabled>
                Select a role
              </option>
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.role && (
              <span id="role-error" className="field-error" role="alert">
                {errors.role}
              </span>
            )}
          </div>
        </fieldset>

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? "Creating account..." : "Create account"}
        </button>

        <button
          type="button"
          className="submit-btn"
          onClick={handleGoogleSignIn}
        >
          <img src={Googleimage} className="btn-icon" alt="Google" />
          <span>Continue with Google</span>
        </button>
        {errors.google && (
          <span className="field-error" role="alert">
            {errors.google}
          </span>
        )}

        <p className="register-footer">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>
    </main>
  );
}