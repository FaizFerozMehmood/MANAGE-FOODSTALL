import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

import Login from "./pages/Login";
import AddUsers from "./pages/AddUsers";
import StatsReports from "./pages/StatsReport.jsx";
import UserLists from "./pages/UserLists";
import GetStats from "./cityManagerRoutes/GetStats";
import GetCityManagers from "./cityManagerRoutes/getCityManagers";
import CityManagerHeader from "./cityManagerRoutes/CityManagerHeader";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header/HeaderForAdmin";
import UploadStats from "./ManagersRoutes/UploadStats";
import BranchHistory from "./ManagersRoutes/BranchHistory";
import ManagerHeader from "./ManagersRoutes/managerH.jsx";
import EmailForm from "./services/Email.jsx";

function App() {
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const role = Cookies.get("userRole");
    const token = Cookies.get("token");
    setUserRole(role);
    setLoading(false);

    if (token && role) {
      const redirectPath =
        role === "admin"
          ? "/dashboard"
          : role === "city_manager"
          ? "/citystats"
          : role === "branch_manager"
          ? "/branchHistory"
          : "/";
      Navigate(redirectPath, { replace: true });
    }
  }, [Navigate]);

  const getHeader = () => {
    if (!userRole) return null;
    if (userRole === "admin") return <Header />;
    if (userRole === "city_manager") return <CityManagerHeader />;
    if (userRole === "branch_manager") return <ManagerHeader />;
    return null;
  };

  const redirectToDashboard = () => {
    if (userRole === "admin") return "/dashboard";
    if (userRole === "city_manager") return "/citystats";
    if (userRole === "branch_manager") return "/branchHistory";
    return "/";
  };

  const ProtectedRoute = ({ role, children }) => {
    if (!userRole) return <Navigate to="/" replace />;
    if (userRole !== role)
      return <Navigate to={redirectToDashboard()} replace />;
    return children;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {location.pathname !== "/" && userRole && getHeader()}
      <Routes>
        <Route
          path="/"
          element={
            userRole ? (
              <Navigate to={redirectToDashboard()} replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-user"
          element={
            <ProtectedRoute role="admin">
              <AddUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute role="admin">
              <StatsReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute role="admin">
              <UserLists />
            </ProtectedRoute>
          }
        />
        <Route
          path="/citystats"
          element={
            <ProtectedRoute role="city_manager">
              <GetStats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cityManagers"
          element={
            <ProtectedRoute role="city_manager">
              <GetCityManagers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/branchHistory"
          element={
            <ProtectedRoute role="branch_manager">
              <BranchHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/uploadStats"
          element={
            <ProtectedRoute role="branch_manager">
              <UploadStats />
            </ProtectedRoute>
          }
        />
        <Route path="/emailService" element={<EmailForm/>}/>
      </Routes>
    </>
  );
}

export default App;
