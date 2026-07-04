import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../stylesheets/LandingPage.css";

const STAGES = ["Sent", "Signed", "Paid"];

function ContractCard() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStage((s) => (s + 1) % STAGES.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <article className="contract-card">
      <header className="contract-card__top">
        <span className="contract-card__id">Contract #CR-1042</span>
        <span className={`contract-card__badge stage-${stage}`}>
          {STAGES[stage]}
        </span>
      </header>

      <dl className="contract-card__details">
        <div className="contract-card__row">
          <dt>Freelancer</dt>
          <dd>Amara Okafor — Brand design</dd>
        </div>
        <div className="contract-card__row">
          <dt>Client</dt>
          <dd>Northwind Retail Co.</dd>
        </div>
        <div className="contract-card__row">
          <dt>Milestone</dt>
          <dd>Logo &amp; visual identity</dd>
        </div>
      </dl>

      <p className="contract-card__amount">
        <span>Amount</span>
        <span>R2,400.00</span>
      </p>

      <ul className="contract-card__track">
        {STAGES.map((s, i) => (
          <li
            key={s}
            className={`contract-card__dot ${i <= stage ? "is-active" : ""}`}
          />
        ))}
      </ul>
    </article>
  );
}

export default function LandingPage() {
  return (
    <main className="landing">
      <nav className="landing-nav">
        <span className="landing-nav__brand">NexWork</span>

        <ul className="landing-nav__links">
          <li><a href="#clients">For clients</a></li>
          <li><a href="#freelancers">For freelancers</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>

        <ul className="landing-nav__cta">
          <li><Link to="/login" className="nav-link">Log in</Link></li>
          <li><Link to="/register" className="nav-btn">Get started</Link></li>
        </ul>
      </nav>

      <section className="hero">
        <header className="hero__copy">
          <span className="hero__eyebrow">Freelancer management, without the spreadsheet</span>
          <h1 className="hero__title">
            Every contract, payment, and milestone — in one ledger.
          </h1>
          <p className="hero__subtitle">
            NexWork keeps clients and freelancers on the same page from the
            first proposal to the final payout. No more chasing invoices in
            your inbox.
          </p>
          <p className="hero__actions">
            <Link to="/register" className="btn btn-primary">Create your account</Link>
            <a href="#how-it-works" className="btn btn-ghost">See how it works</a>
          </p>
        </header>

        <aside className="hero__visual">
          <ContractCard />
        </aside>
      </section>

      <section className="audiences" id="how-it-works">
        <article className="audience-card" id="clients">
          <span className="audience-card__tag">For clients</span>
          <h3>Hire with confidence</h3>
          <ul>
            <li>Post a brief and review vetted freelancer proposals</li>
            <li>Approve milestones before funds are released</li>
            <li>Keep every contract and receipt in one place</li>
          </ul>
        </article>

        <article className="audience-card" id="freelancers">
          <span className="audience-card__tag">For freelancers</span>
          <h3>Get paid on your terms</h3>
          <ul>
            <li>Send contracts with built-in e-signatures</li>
            <li>Track milestones and invoices without a spreadsheet</li>
            <li>Get notified the moment a client pays</li>
          </ul>
        </article>
      </section>

      <section className="cta-banner" id="pricing">
        <h2>Set up your first contract in minutes.</h2>
        <p>Free for your first five active projects. No credit card needed.</p>
        <Link to="/register" className="btn btn-primary">Create your account</Link>
      </section>

      <Footer />
    </main>
  );
}