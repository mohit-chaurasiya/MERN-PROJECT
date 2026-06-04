import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import SecurityDashboard from "./pages/security/SecurityDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import Visitors from "./pages/admin/Visitors";
import CreateAppointment from "./pages/employee/CreateAppointment";
import CreateVisitor from "./pages/employee/CreateVisitor";
import EmployeeVisitors from "./pages/employee/EmployeeVisitors";
import EmployeeAppointmentTable from "./pages/employee/EmployeeAppointmentTable";
import ScanVisitor from "./pages/security/ScanVisitor";
import VisitorLogs from "./pages/security/VisitorLogs";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import VerifyPass from "./pages/security/VerifyPass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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
          path="/employee/create-visitor"
          element={
            <RoleProtectedRoute allowedRole="employee">
              <CreateVisitor />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/employee/create-appointments"
          element={
            <RoleProtectedRoute allowedRole="employee">
              <CreateAppointment />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/employee/appointments"
          element={
            <RoleProtectedRoute allowedRole="employee">
              <EmployeeAppointmentTable />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/employee/visitors"
          element={
            <RoleProtectedRoute allowedRole="employee">
              <EmployeeVisitors />
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

        <Route
          path="/security/scan"
          element={
            <RoleProtectedRoute allowedRole="security">
              <ScanVisitor />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/security/verify"
          element={
            <RoleProtectedRoute allowedRole="security">
              <VerifyPass />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/security/logs"
          element={
            <RoleProtectedRoute allowedRole="security">
              <VisitorLogs />
            </RoleProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
