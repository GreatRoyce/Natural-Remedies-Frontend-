import { useEffect, useState } from "react";
import { getAnalytics } from "../services/superAdmin.api";
import MetricCard from "../components/MetricCard";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAnalytics().then(setData);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">System Overview</h2>

      <div className="grid grid-cols-5 gap-4">
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