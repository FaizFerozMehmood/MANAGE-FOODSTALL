import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./index.css";
import Cookies from "js-cookie";

import Login from "./pages/Login";
import AddUsers from "./pages/AddUsers";
import StatsReports from "./pages/statsReport";
import UserLists from "./pages/UserLists";
import GetStats from "./cityManagerRoutes/GetStats";
import GetCityManagers from "./cityManagerRoutes/getCityManagers";
import CityManagerHeader from "./cityManagerRoutes/CityManagerHeader";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header/HeaderForAdmin";
import UploadStats from "./ManagersRoutes/UploadStats";
import BranchHistory from "./ManagersRoutes/BranchHistory";

function App() {
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = Cookies.get("userRole");
    setUserRole(role);
    console.log("userRole in app:", role);
    setLoading(false);
  }, []);

  const getHeader = () => {
    if (!userRole) return null;
    if (userRole === "admin") return <Header />;
    if (userRole === "city_manager") return <CityManagerHeader />;
    return null;
  };

  const redirectToDashboard = () => {
    if (userRole === "admin") return "/dashboard";
    if (userRole === "city_manager") return "/citystats";
    if (userRole === "branch_manager") return "/branchHistory";
    return "/";
  };

  const ProtectedRoute = ({ role, children }) => {
    if (!userRole) return <Navigate to="/" />;
    if (userRole !== role) return <Navigate to={redirectToDashboard()} />;
    return children;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {location.pathname !== "/" && userRole && getHeader()}
      <Routes>
        <Route
          path="/"
          element={userRole ? <Navigate to={redirectToDashboard()} /> : <Login />}
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
      </Routes>
    </>
  );
}

export default App;
