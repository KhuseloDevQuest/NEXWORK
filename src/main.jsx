import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LandingPage from './pages/LandingPage.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import CompleteProfile from './pages/CompleteProfile.jsx'
import ClientDashboard from './pages/ClientDashboard.jsx'
import FreelancerDashboard from './pages/FreelancerDashboard.jsx'

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
    path: "/freelancer-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["Freelancer"]}>
        <FreelancerDashboard />
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