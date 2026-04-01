import { useEffect, useState } from "react";
import {
  getHerbalists,
  verifyHerbalist,
  rejectHerbalist,
  unverifyHerbalist,
} from "../services/admin.api";

const Herbalists = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const res = await getHerbalists();
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Herbalist Applications
      </h2>

      <table className="w-full bg-white rounded-xl shadow">
        <thead className="bg-secondarybackground text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th>Bio</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((h) => (
            <tr key={h.id} className="border-b">
              <td className="p-3">{h.name}</td>
              <td>{h.bio}</td>
              <td>{h.verificationStatus}</td>
              <td className="space-x-2">
                <button onClick={() => verifyHerbalist(h.id)}>
                  Verify
                </button>
                <button onClick={() => rejectHerbalist(h.id)}>
                  Reject
                </button>
                <button onClick={() => unverifyHerbalist(h.id)}>
                  Unverify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Herbalists;
