import Sidebar from "./Sidebar";

const SuperAdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-primarybackground font-poppins">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default SuperAdminLayout;
