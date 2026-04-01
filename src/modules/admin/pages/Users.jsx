import { useEffect, useState } from "react";
import {
  getUsers,
  suspendUser,
  unsuspendUser,
} from "../services/admin.api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  const handleSuspend = async (id) => {
    setActionLoading((p) => ({ ...p, [id]: true }));
    await suspendUser(id);
    fetchUsers();
    setActionLoading((p) => ({ ...p, [id]: false }));
  };

  const handleUnsuspend = async (id) => {
    setActionLoading((p) => ({ ...p, [id]: true }));
    await unsuspendUser(id);
    fetchUsers();
    setActionLoading((p) => ({ ...p, [id]: false }));
  };

  if (loading) return <div className="p-6">Loading users...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Users</h2>

      <table className="w-full bg-white rounded-xl shadow">
        <thead className="bg-secondarybackground text-white text-sm">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="p-3">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.isSuspended ? "Suspended" : "Active"}
              </td>
              <td>
                {u.isSuspended ? (
                  <button
                    onClick={() => handleUnsuspend(u.id)}
                    disabled={actionLoading[u.id]}
                    className="text-green-600 disabled:opacity-60"
                  >
                    {actionLoading[u.id] ? "Unsuspending..." : "Unsuspend"}
                  </button>
                ) : (
                  <button
                    onClick={() => handleSuspend(u.id)}
                    disabled={actionLoading[u.id]}
                    className="text-red-600 disabled:opacity-60"
                  >
                    {actionLoading[u.id] ? "Suspending..." : "Suspend"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
