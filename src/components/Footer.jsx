import { Link } from "react-router-dom";
import "../stylesheets/Footer.css";


export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-brand__name">NexWork</span>
          <p className="footer-brand__tagline">
            Every contract, payment, and milestone — in one ledger.
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} NexWork. All rights reserved.</small>
      </div>
    </footer>
  );
}