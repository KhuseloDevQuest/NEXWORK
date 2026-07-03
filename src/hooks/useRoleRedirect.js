import { useNavigate } from "react-router-dom";

export default function useRoleRedirect() {
  const navigate = useNavigate();

  const redirectByRole = (profile) => {
    if (!profile?.role) {
      navigate("/complete-profile");
      return;
    }

    if (profile.role === "Client") {
      navigate("/client-dashboard");
      return;
    }

    navigate("/freelancer-dashboard");
  };

  return redirectByRole;
}