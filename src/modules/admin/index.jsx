import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Herbalists from "./pages/Herbalists";

const Admin = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="herbalists" element={<Herbalists />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;