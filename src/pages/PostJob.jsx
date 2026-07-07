import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { createJob } from "../services/jobService";
import Header from "../components/Header";
import "../stylesheets/ClientJobs.css";

const SKILL_SUGGESTIONS = [
  "React", "Node.js", "Python", "UI/UX Design", "Graphic Design",
  "Copywriting", "Video Editing", "SEO", "Mobile Development", "Data Analysis",
];

export default function PostJob() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    skills: [],
    skillInput: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    if (form.skills.includes(trimmed)) return;
    if (form.skills.length >= 10) return;

    setForm((prev) => ({ ...prev, skills: [...prev.skills, trimmed], skillInput: "" }));
    setErrors((prev) => ({ ...prev, skills: "" }));
  };

  const removeSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(form.skillInput);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Job title is required.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (form.description.trim().length < 50) {
      newErrors.description = "Please write at least 50 characters so freelancers understand the work.";
    }

    if (!form.budget) {
      newErrors.budget = "Budget is required.";
    } else if (isNaN(form.budget) || Number(form.budget) <= 0) {
      newErrors.budget = "Enter a valid budget amount.";
    }

    if (form.skills.length === 0) {
      newErrors.skills = "Add at least one required skill.";
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
      await createJob(user.uid, {
        title: form.title,
        description: form.description,
        budget: form.budget,
        skills: form.skills,
      });

      navigate("/client-jobs");
    } catch (error) {
      console.error("Failed to post job:", error);
      setErrors({ submit: "Something went wrong posting your job. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="post-job-page">
        <form className="post-job-card" onSubmit={handleSubmit} noValidate>
          <header className="post-job-card__header">
            <h1 className="post-job-card__title">Post a job</h1>
            <p className="post-job-card__subtitle">
              Describe the work and we'll match you with the right freelancers.
            </p>
          </header>

          <fieldset className="post-job-fields">
            <legend className="sr-only">Job details</legend>

            {/* Title */}
            <div className="form-field">
              <label htmlFor="title">Job title</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Brand identity design for a retail startup"
                value={form.title}
                onChange={handleChange}
                className={errors.title ? "input-error" : ""}
                aria-invalid={errors.title ? "true" : "false"}
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              {errors.title && (
                <span id="title-error" className="field-error" role="alert">
                  {errors.title}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="form-field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows={6}
                placeholder="Describe the project, deliverables, timeline, and anything the freelancer should know..."
                value={form.description}
                onChange={handleChange}
                className={errors.description ? "input-error" : ""}
                aria-invalid={errors.description ? "true" : "false"}
                aria-describedby={errors.description ? "description-error" : undefined}
              />
              <span className="form-field__hint">
                {form.description.length} characters
                {form.description.length < 50 && form.description.length > 0
                  ? ` — ${50 - form.description.length} more to go`
                  : ""}
              </span>
              {errors.description && (
                <span id="description-error" className="field-error" role="alert">
                  {errors.description}
                </span>
              )}
            </div>

            {/* Budget */}
            <div className="form-field">
              <label htmlFor="budget">Budget (R)</label>
              <input
                id="budget"
                name="budget"
                type="number"
                min="1"
                placeholder="e.g. 5000"
                value={form.budget}
                onChange={handleChange}
                className={errors.budget ? "input-error" : ""}
                aria-invalid={errors.budget ? "true" : "false"}
                aria-describedby={errors.budget ? "budget-error" : undefined}
              />
              {errors.budget && (
                <span id="budget-error" className="field-error" role="alert">
                  {errors.budget}
                </span>
              )}
            </div>

            {/* Skills */}
            <div className="form-field">
              <label htmlFor="skillInput">Required skills</label>
              <div className={`skills-input-wrap ${errors.skills ? "input-error" : ""}`}>
                {form.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                    <button
                      type="button"
                      className="skill-tag__remove"
                      onClick={() => removeSkill(skill)}
                      aria-label={`Remove ${skill}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  id="skillInput"
                  name="skillInput"
                  type="text"
                  placeholder={form.skills.length === 0 ? "Type a skill and press Enter" : ""}
                  value={form.skillInput}
                  onChange={handleChange}
                  onKeyDown={handleSkillKeyDown}
                  aria-describedby={errors.skills ? "skills-error" : undefined}
                />
              </div>
              {errors.skills && (
                <span id="skills-error" className="field-error" role="alert">
                  {errors.skills}
                </span>
              )}

              {/* Quick-add suggestions */}
              <ul className="skill-suggestions" aria-label="Skill suggestions">
                {SKILL_SUGGESTIONS.filter(
                  (s) => !form.skills.includes(s)
                ).map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      className="skill-suggestion-btn"
                      onClick={() => addSkill(s)}
                    >
                      + {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </fieldset>

          {errors.submit && (
            <span className="field-error" role="alert">
              {errors.submit}
            </span>
          )}

          <div className="post-job-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/client-jobs")}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Posting..." : "Post job"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}