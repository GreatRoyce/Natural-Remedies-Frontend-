import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Auth from "./auth/Auth";
import Explore from "./pages/Explore";
import Contribute from "./pages/Contribute";
import UserDashboard from "./pages/dashboard/UserDashboard";
import HerbalistDashboard from "./pages/dashboard/HerbalistDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import SuperAdminDashboard from "./pages/dashboard/SuperAdminDashboard";

// import About from "./pages/About"; // another page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="auth" element={<Auth />} />
        <Route path="explore" element={<Explore />} />
        <Route path="contribute" element={<Contribute />} />
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/herbalist" element={<HerbalistDashboard />} />
        <Route path="/system/admin" element={<AdminDashboard />} />
        <Route path="/system/admin/super" element={<SuperAdminDashboard />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
