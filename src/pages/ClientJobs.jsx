import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getClientJobs } from "../services/jobService";
import Header from "../components/Header";
import "../stylesheets/ClientJobs.css";

const STATUS_LABEL = {
  open: "Open",
  closed: "Closed",
};

export default function ClientJobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getClientJobs(user.uid);
        setJobs(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load your jobs. Please refresh and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user.uid]);

  return (
    <>
      <Header />
      <main className="client-jobs-page">
        <section className="client-jobs-inner">
          <header className="client-jobs-header">
            <div>
              <h1 className="client-jobs-header__title">Your jobs</h1>
              <p className="client-jobs-header__sub">
                Manage your listings and review proposals.
              </p>
            </div>
            <Link to="/post-job" className="btn-primary">
              + Post a job
            </Link>
          </header>

          {loading && (
            <p className="client-jobs__state">Loading your jobs...</p>
          )}

          {error && (
            <p className="client-jobs__state client-jobs__state--error">{error}</p>
          )}

          {!loading && !error && jobs.length === 0 && (
            <div className="client-jobs__empty">
              <p>You haven't posted any jobs yet.</p>
              <Link to="/post-job" className="btn-primary">
                Post your first job
              </Link>
            </div>
          )}

          {!loading && jobs.length > 0 && (
            <ul className="client-jobs__list">
              {jobs.map((job) => (
                <li key={job.id}>
                  <article className="job-card">
                    <div className="job-card__top">
                      <div>
                        <h2 className="job-card__title">{job.title}</h2>
                        <p className="job-card__meta">
                          Budget: R{job.budget.toLocaleString()}
                        </p>
                      </div>
                      <span className={`job-card__status status--${job.status}`}>
                        {STATUS_LABEL[job.status]}
                      </span>
                    </div>

                    <p className="job-card__description">{job.description}</p>

                    <ul className="job-card__skills" aria-label="Required skills">
                      {job.skills.map((skill) => (
                        <li key={skill} className="skill-tag">{skill}</li>
                      ))}
                    </ul>

                    <footer className="job-card__footer">
                      <Link
                        to={`/client-jobs/${job.id}/applications`}
                        className="btn-secondary"
                      >
                        View proposals
                      </Link>
                    </footer>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}