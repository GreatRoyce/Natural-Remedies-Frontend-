import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnalytics } from "../services/superAdmin.api";
import MetricCard from "../components/MetricCard";
import { LogOut } from "lucide-react"; // optional icon

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    getAnalytics().then(setData);
  }, []);

  const handleLogout = () => {
    // Clear auth token (adjust to your implementation)
    localStorage.removeItem("token");
    // Redirect to home page
    navigate("/");
  };

  return (
    <div className="p-6">
      {/* Header with logout button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">System Overview</h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard title="Users" value={data?.totalUsers} />
        <MetricCard title="Herbalists" value={data?.totalHerbalists} />
        <MetricCard title="Remedies" value={data?.totalRemedies} />
        <MetricCard title="Verified" value={data?.verifiedHerbalists} />
        <MetricCard title="Suspended" value={data?.suspendedUsers} />
      </div>
    </div>
  );
};

export default Dashboard;
