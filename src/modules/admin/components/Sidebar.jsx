import { NavLink } from "react-router-dom";

const linkClass =
  "block px-4 py-2 rounded transition hover:bg-secondary text-sm";

const Sidebar = () => {
  return (
    <div className="w-64 bg-accent text-white flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-secondary">
        Admin Panel
      </div>

      <nav className="p-4 space-y-2">
        <NavLink to="/admin" end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/users" className={linkClass}>
          Users
        </NavLink>
        <NavLink to="/admin/herbalists" className={linkClass}>
          Herbalists
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;