import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import CreateAccount from "../pages/accounts/CreateAccount";
import AccountOverview from "../pages/accounts/AccountOverview";
function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts/create" element={<CreateAccount />} />
        <Route path="/accounts" element={<AccountOverview />} />
      </Route>

      {/* Default */}

      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
