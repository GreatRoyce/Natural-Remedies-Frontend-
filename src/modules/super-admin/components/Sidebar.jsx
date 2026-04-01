import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const base = "block px-4 py-2 rounded";

  return (
    <div className="w-64 bg-accent text-white">
      <div className="p-4 font-bold">Super Admin</div>

      <nav className="p-4 space-y-2">
        <NavLink to="/super-admin" end className={base}>
          Dashboard
        </NavLink>
        <NavLink to="/super-admin/manage" className={base}>
          Manage Admins
        </NavLink>
        <NavLink to="/super-admin/system" className={base}>
          System Control
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;