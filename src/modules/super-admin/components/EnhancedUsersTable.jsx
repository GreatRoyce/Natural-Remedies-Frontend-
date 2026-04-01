import React from "react";

const EnhancedUsersTable = ({
  users,
  loading,
  actionLoading,
  onSuspend,
  onUnsuspend,
  onRoleChange,
  onHardDelete,
  showRoleDropdown = false,
  showHardDelete = false
}) => {
  if (loading) {
    return <div className="flex justify-center items-center h-32">Loading users...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map(user => {
            const isSuperAdmin = user.role === "superadmin";
            const canModify = !isSuperAdmin; // self-check can be added via prop

            return (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">
                  {showRoleDropdown && canModify ? (
                    <select
                      value={user.role}
                      onChange={(e) => onRoleChange(user.id, e.target.value)}
                      disabled={actionLoading[user.id]}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="user">User</option>
                      <option value="herbalist">Herbalist</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span className="capitalize">{user.role}</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.isSuspended ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                  }`}>
                    {user.isSuspended ? "Suspended" : "Active"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  {!user.isSuspended ? (
                    <button
                      onClick={() => onSuspend(user.id)}
                      disabled={actionLoading[user.id] || !canModify}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      {actionLoading[user.id] ? "Suspending..." : "Suspend"}
                    </button>
                  ) : (
                    <button
                      onClick={() => onUnsuspend(user.id)}
                      disabled={actionLoading[user.id] || !canModify}
                      className="text-green-600 hover:text-green-800 disabled:opacity-50"
                    >
                      {actionLoading[user.id] ? "Unsuspending..." : "Unsuspend"}
                    </button>
                  )}
                  {showHardDelete && canModify && (
                    <button
                      onClick={() => onHardDelete(user.id)}
                      disabled={actionLoading[user.id]}
                      className="text-red-800 hover:text-red-900 font-bold disabled:opacity-50"
                    >
                      {actionLoading[user.id] ? "Deleting..." : "Delete"}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EnhancedUsersTable;
