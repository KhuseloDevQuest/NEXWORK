import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOpenJobs } from "../services/jobService";
import Header from "../components/Header";
import "../stylesheets/FreelancerJobs.css";

export default function FreelancerJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getOpenJobs();
        setJobs(data);
      } catch (err) {
        console.error("Failed to load jobs:", err);
        setError("Failed to load jobs. Please refresh and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filtered = jobs.filter((job) => {
    const q = search.toLowerCase();
    return (
      job.title.toLowerCase().includes(q) ||
      job.description.toLowerCase().includes(q) ||
      job.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <Header />
      <main className="fl-jobs-page">
        <section className="fl-jobs-inner">
          <header className="fl-jobs-header">
            <div>
              <h1 className="fl-jobs-header__title">Browse jobs</h1>
              <p className="fl-jobs-header__sub">
                Find work that matches your skills and submit a proposal.
              </p>
            </div>
          </header>

          <div className="fl-jobs-search">
            <input
              type="search"
              placeholder="Search by title, skill, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search jobs"
            />
          </div>

          {loading && (
            <p className="fl-jobs__state">Loading available jobs...</p>
          )}

          {error && (
            <p className="fl-jobs__state fl-jobs__state--error">{error}</p>
          )}

          {!loading && !error && filtered.length === 0 && (
            <p className="fl-jobs__state">
              {search ? "No jobs match your search." : "No open jobs right now — check back soon."}
            </p>
          )}

          {!loading && filtered.length > 0 && (
            <ul className="fl-jobs__list">
              {filtered.map((job) => (
                <li key={job.id}>
                  <article className="fl-job-card">
                    <div className="fl-job-card__top">
                      <h2 className="fl-job-card__title">{job.title}</h2>
                      <span className="fl-job-card__budget">
                        R{Number(job.budget).toLocaleString()}
                      </span>
                    </div>

                    <p className="fl-job-card__description">
                      {job.description}
                    </p>

                    <ul className="fl-job-card__skills" aria-label="Required skills">
                      {job.skills.map((skill) => (
                        <li key={skill} className="skill-tag">{skill}</li>
                      ))}
                    </ul>

                    <footer className="fl-job-card__footer">
                      <Link
                        to={`/freelancer-jobs/${job.id}`}
                        className="btn-primary"
                      >
                        View &amp; apply
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