import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CompleteProfile from './pages/CompleteProfile.jsx'
import ClientDashboard from './pages/ClientDashboard.jsx';
import ClientJobs from "./pages/ClientJobs.jsx";
import PostJob from "./pages/PostJob.jsx";
import FreelancerDashboard from './pages/FreelancerDashboard.jsx';
import FreelancerJobs from "./pages/FreelancerJobs.jsx";
import JobDetail from "./pages/JobDetail.jsx";
import JobApplications from "./pages/JobApplications.jsx";

const router = createBrowserRouter([
  {path:"/", element: <LandingPage />},
  {path:"/register", element: <Register />},
  {path:"/login", element: <Login />},
  {
    path:"/complete-profile",
    element:(
        <ProtectedRoute>
            <CompleteProfile/>
        </ProtectedRoute>
    )
},
  {
    path: "/client-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["Client"]}>
        <ClientDashboard />
      </ProtectedRoute>
    ),
  },

  {
  path: "/client-jobs",
  element: (
    <ProtectedRoute allowedRoles={["Client"]}>
      <ClientJobs />
    </ProtectedRoute>
  ),
},
{
  path: "/post-job",
  element: (
    <ProtectedRoute allowedRoles={["Client"]}>
      <PostJob />
    </ProtectedRoute>
  ),
},
  {
    path: "/freelancer-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["Freelancer"]}>
        <FreelancerDashboard />
      </ProtectedRoute>
    ),
  },
  {
  path: "/freelancer-jobs",
  element: (
    <ProtectedRoute allowedRoles={["Freelancer"]}>
      <FreelancerJobs />
    </ProtectedRoute>
  ),
},
{
  path: "/freelancer-jobs/:jobId",
  element: (
    <ProtectedRoute allowedRoles={["Freelancer"]}>
      <JobDetail />
    </ProtectedRoute>
  ),
},
  {
  path: "/client-jobs/:jobId/applications",
  element: (
    <ProtectedRoute allowedRoles={["Client"]}>
      <JobApplications />
    </ProtectedRoute>
  ),
},

  ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)