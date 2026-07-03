import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Wrap a route element with this to require sign-in (and optionally a
 * specific role) before it renders.
 *
 * Usage in main.jsx:
 *   {
 *     path: "/client-dashboard",
 *     element: (
 *       <ProtectedRoute allowedRoles={["Client"]}>
 *         <ClientDashboard />
 *       </ProtectedRoute>
 *     ),
 *   }
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main className="loading-page">
        <h2>NexWork</h2>
        <p>Loading your workspace...</p>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!role && location.pathname !== "/complete-profile") {
    return <Navigate to="/complete-profile" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Signed in with a role, but not one allowed to see this page -
    // send them to their own dashboard instead of blocking entirely.
    const fallback =
      role === "Client" ? "/client-dashboard" : "/freelancer-dashboard";
    return <Navigate to={fallback} replace />;
  }

  return children;
}