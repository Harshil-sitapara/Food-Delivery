import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import AdminLogin from "../pages/AdminLogin";
import Feedback from '../pages/Feedback'
import Users from "../pages/Users"

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route path="/admin/feedback" element={<Feedback />} />
      <Route path="/admin/users" element={<Users />} />
    </Routes>
  );
}

export default AdminRoutes;
