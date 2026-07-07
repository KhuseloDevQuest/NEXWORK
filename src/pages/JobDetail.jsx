import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getJob, createApplication, getFreelancerApplications } from "../services/jobService";
import Header from "../components/Header";
import "../stylesheets/FreelancerJobs.css";

export default function JobDetail() {
  const { jobId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const [form, setForm] = useState({
    coverLetter: "",
    proposedRate: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobData, myApplications] = await Promise.all([
          getJob(jobId),
          getFreelancerApplications(user.uid),
        ]);

        if (!jobData) {
          setError("This job doesn't exist or has been removed.");
          return;
        }

        setJob(jobData);

        const hasApplied = myApplications.some((a) => a.jobId === jobId);
        setAlreadyApplied(hasApplied);
      } catch (err) {
        console.error("Failed to load job:", err);
        setError("Failed to load this job. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jobId, user.uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.coverLetter.trim()) {
      newErrors.coverLetter = "A cover letter is required.";
    } else if (form.coverLetter.trim().length < 50) {
      newErrors.coverLetter = "Write at least 50 characters — give the client a reason to choose you.";
    }

    if (!form.proposedRate) {
      newErrors.proposedRate = "Your proposed rate is required.";
    } else if (isNaN(form.proposedRate) || Number(form.proposedRate) <= 0) {
      newErrors.proposedRate = "Enter a valid amount.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      await createApplication(jobId, user.uid, job.clientId, {
        coverLetter: form.coverLetter,
        proposedRate: form.proposedRate,
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit proposal:", err);
      setFormErrors({
        submit: "Something went wrong submitting your proposal. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="fl-jobs-page">
          <p className="fl-jobs__state">Loading job...</p>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="fl-jobs-page">
          <p className="fl-jobs__state fl-jobs__state--error">{error}</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="fl-jobs-page">
        <section className="job-detail-inner">

          {/* Job info */}
          <article className="job-detail-card">
            <header className="job-detail-card__header">
              <div>
                <h1 className="job-detail-card__title">{job.title}</h1>
                <p className="job-detail-card__budget">
                  Budget: R{Number(job.budget).toLocaleString()}
                </p>
              </div>
              <span className={`job-card__status status--${job.status}`}>
                {job.status === "open" ? "Open" : "Closed"}
              </span>
            </header>

            <p className="job-detail-card__description">{job.description}</p>

            <div className="job-detail-card__section">
              <h2>Required skills</h2>
              <ul className="fl-job-card__skills" aria-label="Required skills">
                {job.skills.map((skill) => (
                  <li key={skill} className="skill-tag">{skill}</li>
                ))}
              </ul>
            </div>
          </article>

          {/* Proposal form */}
          {job.status === "closed" ? (
            <aside className="proposal-notice">
              This job is no longer accepting proposals.
            </aside>
          ) : alreadyApplied || submitted ? (
            <aside className="proposal-notice proposal-notice--success">
              <strong>Proposal submitted!</strong> The client will review your
              application and get back to you.
              <button
                className="btn-secondary"
                style={{ marginTop: "16px" }}
                onClick={() => navigate("/freelancer-jobs")}
              >
                Browse more jobs
              </button>
            </aside>
          ) : (
            <form
              className="proposal-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <h2 className="proposal-form__title">Submit a proposal</h2>

              <fieldset className="post-job-fields">
                <legend className="sr-only">Proposal details</legend>

                <div className="form-field">
                  <label htmlFor="coverLetter">Cover letter</label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows={6}
                    placeholder="Introduce yourself, explain why you're a great fit, and outline how you'd approach this project..."
                    value={form.coverLetter}
                    onChange={handleChange}
                    className={formErrors.coverLetter ? "input-error" : ""}
                    aria-invalid={formErrors.coverLetter ? "true" : "false"}
                    aria-describedby={formErrors.coverLetter ? "cover-error" : undefined}
                  />
                  <span className="form-field__hint">
                    {form.coverLetter.length} characters
                    {form.coverLetter.length < 50 && form.coverLetter.length > 0
                      ? ` — ${50 - form.coverLetter.length} more to go`
                      : ""}
                  </span>
                  {formErrors.coverLetter && (
                    <span id="cover-error" className="field-error" role="alert">
                      {formErrors.coverLetter}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="proposedRate">Your proposed rate (R)</label>
                  <input
                    id="proposedRate"
                    name="proposedRate"
                    type="number"
                    min="1"
                    placeholder="e.g. 4500"
                    value={form.proposedRate}
                    onChange={handleChange}
                    className={formErrors.proposedRate ? "input-error" : ""}
                    aria-invalid={formErrors.proposedRate ? "true" : "false"}
                    aria-describedby={formErrors.proposedRate ? "rate-error" : undefined}
                  />
                  {formErrors.proposedRate && (
                    <span id="rate-error" className="field-error" role="alert">
                      {formErrors.proposedRate}
                    </span>
                  )}
                </div>
              </fieldset>

              {formErrors.submit && (
                <span className="field-error" role="alert">
                  {formErrors.submit}
                </span>
              )}

              <div className="post-job-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate("/freelancer-jobs")}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit proposal"}
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    </>
  );
}