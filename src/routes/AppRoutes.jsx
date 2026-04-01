import React from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "../modules/user/pages/Homepage";
import Auth from "../modules/user/pages/Auth";
import Explore from "../modules/user/pages/Explore";
import Contribute from "../modules/user/pages/Contribute";

import UserDashboard from "../modules/user/pages/Dashboard";
import HerbalistDashboard from "../modules/herbalist/pages/Dashboard";
import Admin from "../modules/admin/index.jsx";
import SuperAdmin from "../modules/super-admin/index.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Homepage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/contribute" element={<Contribute />} />

      {/* User dashboards */}
      <Route path="/dashboard/user" element={<UserDashboard />} />
      <Route path="/dashboard/herbalist" element={<HerbalistDashboard />} />
      <Route path="/system/admin/*" element={<Admin />} />
      <Route path="/super-admin/*" element={<SuperAdmin />} />

    </Routes>
  );
};

export default AppRoutes;
