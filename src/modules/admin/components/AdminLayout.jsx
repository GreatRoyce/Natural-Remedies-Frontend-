import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-primarybackground font-poppins">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminLayout;