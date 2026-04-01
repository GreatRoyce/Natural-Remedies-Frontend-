import React from "react";

const HerbalistsTable = ({ herbalists, loading, actionLoading, onVerify, onReject, onUnverify }) => {
  if (loading) {
    return <div className="flex justify-center items-center h-32">Loading applications...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bio</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {herbalists.map(h => (
            <tr key={h.id}>
              <td className="px-6 py-4 whitespace-nowrap">{h.name}</td>
              <td className="px-6 py-4 max-w-xs truncate">{h.bio || "—"}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  h.verificationStatus === "verified" ? "bg-green-100 text-green-800" :
                  h.verificationStatus === "rejected" ? "bg-red-100 text-red-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {h.verificationStatus === "pending" ? "Pending" :
                   h.verificationStatus === "verified" ? "Verified" : "Rejected"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                {h.verificationStatus !== "verified" && (
                  <button
                    onClick={() => onVerify(h.id)}
                    disabled={actionLoading[h.id]}
                    className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                  >
                    {actionLoading[h.id] ? "Verifying..." : "Verify"}
                  </button>
                )}
                {h.verificationStatus === "verified" && (
                  <button
                    onClick={() => onUnverify(h.id)}
                    disabled={actionLoading[h.id]}
                    className="text-orange-600 hover:text-orange-800 disabled:opacity-50"
                  >
                    {actionLoading[h.id] ? "Unverifying..." : "Unverify"}
                  </button>
                )}
                {h.verificationStatus !== "rejected" && (
                  <button
                    onClick={() => onReject(h.id)}
                    disabled={actionLoading[h.id]}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                  >
                    {actionLoading[h.id] ? "Rejecting..." : "Reject"}
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

export default HerbalistsTable;
