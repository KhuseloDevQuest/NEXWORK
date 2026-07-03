import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserRole } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import "../stylesheets/CompleteProfile.css";

const ROLES = [
  {
    value: "Client",
    title: "I'm a Client",
    description: "I want to post work and hire freelancers.",
  },
  {
    value: "Freelancer",
    title: "I'm a Freelancer",
    description: "I want to find work and get paid for projects.",
  },
];

export default function CompleteProfile() {
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      setError("Please select a role to continue.");
      return;
    }

    if (!user) {
      setError("We lost track of your session. Please sign in again.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await updateUserRole(user.uid, role);
      await refreshProfile();

      if (role === "Client") {
        navigate("/client-dashboard");
      } else {
        navigate("/freelancer-dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong saving your profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="complete-profile-page">
      <form
        className="complete-profile-card"
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className="complete-profile-title">One more step</h1>
        <p className="complete-profile-subtitle">
          Tell us how you plan to use the platform so we can set up your
          account.
        </p>

        <fieldset className="role-fieldset">
          <legend className="sr-only">Choose your role</legend>

          <div className="role-options">
            {ROLES.map(({ value, title, description }) => (
              <label
                key={value}
                className={`role-option ${role === value ? "is-selected" : ""}`}
              >
                <input
                  type="radio"
                  name="role"
                  value={value}
                  checked={role === value}
                  onChange={() => {
                    setRole(value);
                    setError("");
                  }}
                />
                <span className="role-option__title">{title}</span>
                <span className="role-option__description">{description}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {error && (
          <span className="field-error" role="alert">
            {error}
          </span>
        )}

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? "Saving..." : "Continue"}
        </button>
      </form>
    </main>
  );
}