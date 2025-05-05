import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Public pages
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Developer pages
import DeveloperDashboard from "./pages/Devoloper/DeveloperDashboard";
import Connect from "./pages/Devoloper/Connect";
import Connections from "./pages/Devoloper/Connections";
import Apply from "./pages/Devoloper/Apply";
import Applications from "./pages/Devoloper/Applications";
import Settings from "./pages/Devoloper/Settings";
import Profile from "./pages/Devoloper/Profile";

// Company pages
import CompanyDashboard from "./pages/Company/CompanyDashboard";
import Applicants from "./pages/Company/Applicants";
import CompanySettings from "./pages/Company/CompanySettings";
import About from "./components/About";
import FeaturesPage from "./components/FeaturesPage";
import ResetPassword from "./pages/ResetPassword";

// ProtectedRoute component
const ProtectedRoute = ({ element, role }) => {
  const developerId = localStorage.getItem("developerId");
  const companyId = localStorage.getItem("companyId");

  if (role === "developer" && developerId) return element;
  if (role === "company" && companyId) return element;

  return <Navigate to="/" />;
};

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        {/* Developer Protected Routes */}
        <Route
          path="/developer/dashboard"
          element={
            <ProtectedRoute element={<DeveloperDashboard />} role="developer" />
          }
        />
        <Route
          path="/developer/connect"
          element={<ProtectedRoute element={<Connect />} role="developer" />}
        />
        <Route
          path="/developer/connections"
          element={
            <ProtectedRoute element={<Connections />} role="developer" />
          }
        />
        <Route
          path="/developer/apply"
          element={<ProtectedRoute element={<Apply />} role="developer" />}
        />
        <Route
          path="/developer/applications"
          element={
            <ProtectedRoute element={<Applications />} role="developer" />
          }
        />
        <Route
          path="/developer/settings"
          element={<ProtectedRoute element={<Settings />} role="developer" />}
        />
        <Route
          path="/developer/profile"
          element={<ProtectedRoute element={<Profile />} role="developer" />}
        />

        {/* Company Protected Routes */}
        <Route
          path="/company/dashboard"
          element={
            <ProtectedRoute element={<CompanyDashboard />} role="company" />
          }
        />
        <Route
          path="/company/job/:jobId/applications"
          element={<ProtectedRoute element={<Applicants />} role="company" />}
        />
        <Route
          path="/company/settings"
          element={
            <ProtectedRoute element={<CompanySettings />} role="company" />
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
