import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function FreelancerDashboard() {
  const navigate = useNavigate();
  const { displayName } = useAuth();

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();

    navigate("/");
  };
  return (
    <>
      <h1> Welcome back, {displayName}</h1>
      <button onClick={handleLogout}>Log Out</button>
    </>
  );
}