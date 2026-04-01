import React, { useState } from "react";
import EnhancedUsersTable from "../components/EnhancedUsersTable";

const ManageAdmins = ({ users, loadingUsers, actionLoading, onRoleChange, onHardDelete, onSuspend, onUnsuspend, onCreateAdmin }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", username: "" });
  const [creating, setCreating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await onCreateAdmin(formData);
      setFormData({ name: "", email: "", password: "", username: "" });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Create New Admin</h2>
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          <input type="text" placeholder="Name *" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="input" />
          <input type="email" placeholder="Email *" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required className="input" />
          <input type="password" placeholder="Password *" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required className="input" />
          <input type="text" placeholder="Username (optional)" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} className="input" />
          <button type="submit" disabled={creating} className="btn-primary">{creating ? "Creating..." : "Create Admin"}</button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Role Management & User Deletion</h2>
        {loadingUsers ? (
          <div className="flex justify-center items-center h-32">Loading users...</div>
        ) : (
          <EnhancedUsersTable
            users={users}
            loading={loadingUsers}
            actionLoading={actionLoading}
            onSuspend={onSuspend}
            onUnsuspend={onUnsuspend}
            onRoleChange={onRoleChange}
            onHardDelete={onHardDelete}
            showRoleDropdown
            showHardDelete
          />
        )}
      </div>
    </div>
  );
};

export default ManageAdmins;