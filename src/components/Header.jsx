import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../stylesheets/Header.css";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="site-header">
      <nav className="header-nav">
        <span className="header-nav__brand">NexWork</span>

        <ul className="header-nav__links">
          <li><a href="#ongoing">Ongoing projects</a></li>
          <li><a href="#payments">Payments</a></li>
          <li><a href="#settings">Settings</a></li>
        </ul>

        <ul className="header-nav__cta">
          <li>
            <button className="header-logout-btn" onClick={handleLogout}>
              Log out
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}