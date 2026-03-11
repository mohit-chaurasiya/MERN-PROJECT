import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import SecurityDashboard from "./pages/security/SecurityDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import Visitors from "./pages/admin/Visitors";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/visitors"
          element={
            <RoleProtectedRoute allowedRole="admin">
              <Visitors />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <RoleProtectedRoute allowedRole="employee">
              <EmployeeDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/security"
          element={
            <RoleProtectedRoute allowedRole="security">
              <SecurityDashboard />
            </RoleProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
