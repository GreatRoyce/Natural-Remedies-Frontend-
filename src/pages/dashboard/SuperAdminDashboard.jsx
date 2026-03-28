import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------
// Toast Context (simple hook for notifications)
// ----------------------------------------------------------------------
const useToast = () => {
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };
  const ToastComponent = () => (
    toast.show && (
      <div className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg text-white ${
        toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
      }`}>
        {toast.message}
      </div>
    )
  );
  return { showToast, ToastComponent };
};

// ----------------------------------------------------------------------
// API helper
// ----------------------------------------------------------------------
const apiFetch = async (url, options = {}) => {
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `HTTP ${res.status}`);
  }
  return res.json();
};

// ----------------------------------------------------------------------
// Metric Card component (reused)
// ----------------------------------------------------------------------
const MetricCard = ({ title, value }) => (
  <div className="bg-white shadow rounded-lg p-4 border">
    <div className="text-gray-500 text-sm uppercase tracking-wide">{title}</div>
    <div className="text-3xl font-bold mt-1">{value ?? 0}</div>
  </div>
);

// ----------------------------------------------------------------------
// Dashboard Page (same as admin)
// ----------------------------------------------------------------------
const DashboardPage = ({ analytics, loading }) => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">System Overview</h2>
    {loading ? (
      <div className="flex justify-center items-center h-32">Loading metrics...</div>
    ) : analytics ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard title="Total Users" value={analytics.totalUsers} />
        <MetricCard title="Total Herbalists" value={analytics.totalHerbalists} />
        <MetricCard title="Total Remedies" value={analytics.totalRemedies} />
        <MetricCard title="Verified Herbalists" value={analytics.verifiedHerbalists} />
        <MetricCard title="Suspended Users" value={analytics.suspendedUsers} />
      </div>
    ) : (
      <div className="text-red-600">Failed to load metrics</div>
    )}
  </div>
);

// ----------------------------------------------------------------------
// Users Table (enhanced for super admin)
// ----------------------------------------------------------------------
const EnhancedUsersTable = ({ users, loading, actionLoading, onSuspend, onUnsuspend, onRoleChange, onHardDelete, showRoleDropdown = false, showHardDelete = false }) => {
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
            const isSelf = false; // you need to pass currentUserId from context to compare; for now assume we have a prop
            const isSuperAdmin = user.role === 'superadmin'; // adjust to your role naming
            const canModify = !isSuperAdmin || !isSelf; // super admin cannot modify another super admin; self cannot be deleted

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
                    user.isSuspended ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {user.isSuspended ? 'Suspended' : 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  {!user.isSuspended ? (
                    <button
                      onClick={() => onSuspend(user.id)}
                      disabled={actionLoading[user.id] || !canModify}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      {actionLoading[user.id] ? 'Suspending...' : 'Suspend'}
                    </button>
                  ) : (
                    <button
                      onClick={() => onUnsuspend(user.id)}
                      disabled={actionLoading[user.id] || !canModify}
                      className="text-green-600 hover:text-green-800 disabled:opacity-50"
                    >
                      {actionLoading[user.id] ? 'Unsuspending...' : 'Unsuspend'}
                    </button>
                  )}
                  {showHardDelete && canModify && (
                    <button
                      onClick={() => onHardDelete(user.id)}
                      disabled={actionLoading[user.id]}
                      className="text-red-800 hover:text-red-900 font-bold disabled:opacity-50"
                    >
                      {actionLoading[user.id] ? 'Deleting...' : 'Delete'}
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

// ----------------------------------------------------------------------
// Herbalists Table (same as admin)
// ----------------------------------------------------------------------
const HerbalistsTable = ({ herbalists, loading, actionLoading, onVerify, onReject, onUnverify }) => (
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
        {herbalists.map(herbalist => (
          <tr key={herbalist.id}>
            <td className="px-6 py-4 whitespace-nowrap">{herbalist.name}</td>
            <td className="px-6 py-4 max-w-xs truncate">{herbalist.bio || '—'}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                herbalist.verificationStatus === 'verified' ? 'bg-green-100 text-green-800' :
                herbalist.verificationStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {herbalist.verificationStatus === 'pending' ? 'Pending' :
                 herbalist.verificationStatus === 'verified' ? 'Verified' : 'Rejected'}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap space-x-2">
              {herbalist.verificationStatus !== 'verified' && (
                <button
                  onClick={() => onVerify(herbalist.id)}
                  disabled={actionLoading[herbalist.id]}
                  className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                >
                  {actionLoading[herbalist.id] ? 'Verifying...' : 'Verify'}
                </button>
              )}
              {herbalist.verificationStatus === 'verified' && (
                <button
                  onClick={() => onUnverify(herbalist.id)}
                  disabled={actionLoading[herbalist.id]}
                  className="text-orange-600 hover:text-orange-800 disabled:opacity-50"
                >
                  {actionLoading[herbalist.id] ? 'Unverifying...' : 'Unverify'}
                </button>
              )}
              {herbalist.verificationStatus !== 'rejected' && (
                <button
                  onClick={() => onReject(herbalist.id)}
                  disabled={actionLoading[herbalist.id]}
                  className="text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  {actionLoading[herbalist.id] ? 'Rejecting...' : 'Reject'}
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ----------------------------------------------------------------------
// Admin Control Page
// ----------------------------------------------------------------------
const AdminControlPage = ({ users, loadingUsers, actionLoading, onRoleChange, onHardDelete, onSuspend, onUnsuspend, onCreateAdmin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', username: '' });
  const [creating, setCreating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await onCreateAdmin(formData);
      setFormData({ name: '', email: '', password: '', username: '' });
    } catch (error) {
      // error already handled in parent
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Create New Admin</h2>
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password *</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username (optional)</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <button
            type="submit"
            disabled={creating}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 disabled:opacity-50"
          >
            {creating ? 'Creating...' : 'Create Admin'}
          </button>
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
            showRoleDropdown={true}
            showHardDelete={true}
          />
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Main Super Admin Dashboard Component
// ----------------------------------------------------------------------
const SuperAdminDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [herbalists, setHerbalists] = useState([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingHerbalists, setLoadingHerbalists] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const { showToast, ToastComponent } = useToast();

  // Assume we have current user info from context/auth; for now we hardcode current user id for safety
  const currentUserId = 'current-user-id'; // replace with actual logged-in user id

  // API helpers
  const fetchAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const data = await apiFetch('/api/admin/analytics');
      setAnalytics(data);
    } catch (error) {
      showToast('Failed to load dashboard metrics', 'error');
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const data = await apiFetch('/api/admin/users');
      setUsers(data);
    } catch (error) {
      showToast('Failed to load users', 'error');
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchHerbalists = async () => {
    setLoadingHerbalists(true);
    try {
      const data = await apiFetch('/api/admin/herbalists?applied=true');
      setHerbalists(data);
    } catch (error) {
      showToast('Failed to load herbalist applications', 'error');
    } finally {
      setLoadingHerbalists(false);
    }
  };

  useEffect(() => {
    if (activePage === 'dashboard') {
      fetchAnalytics();
    } else if (activePage === 'users' || activePage === 'admincontrol') {
      fetchUsers();
    } else if (activePage === 'herbalists') {
      fetchHerbalists();
    }
  }, [activePage]);

  // User actions (suspend/unsuspend) – same as admin
  const suspendUser = async (userId) => {
    setActionLoading(prev => ({ ...prev, [userId]: true }));
    try {
      await apiFetch(`/api/admin/users/${userId}/suspend`, { method: 'PATCH' });
      showToast('User suspended');
      fetchUsers();
    } catch (error) {
      showToast('Failed to suspend user', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const unsuspendUser = async (userId) => {
    setActionLoading(prev => ({ ...prev, [userId]: true }));
    try {
      await apiFetch(`/api/admin/users/${userId}/unsuspend`, { method: 'PATCH' });
      showToast('User unsuspended');
      fetchUsers();
    } catch (error) {
      showToast('Failed to unsuspend user', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  // Super admin specific actions
  const updateRole = async (userId, newRole) => {
    setActionLoading(prev => ({ ...prev, [userId]: true }));
    try {
      await apiFetch('/api/super-admin', {
        method: 'PATCH',
        body: JSON.stringify({ userId, role: newRole }),
      });
      showToast('Role updated');
      fetchUsers(); // refresh
    } catch (error) {
      showToast('Failed to update role', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const hardDeleteUser = async (userId) => {
    // Prevent self-deletion
    if (userId === currentUserId) {
      showToast('You cannot delete your own account', 'error');
      return;
    }
    // Confirm with user
    if (!window.confirm('⚠️ This action cannot be undone. Are you sure you want to permanently delete this user?')) return;

    setActionLoading(prev => ({ ...prev, [userId]: true }));
    try {
      await apiFetch('/api/super-admin', {
        method: 'DELETE',
        body: JSON.stringify({ userId }),
      });
      showToast('User deleted permanently');
      fetchUsers();
    } catch (error) {
      showToast('Failed to delete user', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  // Herbalist actions
  const verifyHerbalist = async (userId) => {
    setActionLoading(prev => ({ ...prev, [userId]: true }));
    try {
      await apiFetch(`/api/admin/herbalists/${userId}/verify`, { method: 'PATCH' });
      showToast('Herbalist verified');
      fetchHerbalists();
    } catch (error) {
      showToast('Failed to verify herbalist', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const rejectHerbalist = async (userId) => {
    if (!window.confirm('Are you sure you want to reject this application?')) return;
    setActionLoading(prev => ({ ...prev, [userId]: true }));
    try {
      await apiFetch(`/api/admin/herbalists/${userId}/reject`, { method: 'PATCH' });
      showToast('Herbalist application rejected');
      fetchHerbalists();
    } catch (error) {
      showToast('Failed to reject herbalist', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const unverifyHerbalist = async (userId) => {
    if (!window.confirm('Are you sure you want to unverify this herbalist?')) return;
    setActionLoading(prev => ({ ...prev, [userId]: true }));
    try {
      await apiFetch(`/api/admin/herbalists/${userId}/unverify`, { method: 'PATCH' });
      showToast('Herbalist unverified');
      fetchHerbalists();
    } catch (error) {
      showToast('Failed to unverify herbalist', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const createAdmin = async (adminData) => {
    try {
      await apiFetch('/api/super-admin', {
        method: 'POST',
        body: JSON.stringify(adminData),
      });
      showToast('Admin created');
      // Optionally refresh users if needed
      fetchUsers();
    } catch (error) {
      showToast('Failed to create admin', 'error');
      throw error;
    }
  };

  // Sidebar component
  const Sidebar = () => (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-gray-700">Super Admin Panel</div>
      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => setActivePage('dashboard')}
          className={`w-full text-left px-4 py-2 rounded transition-colors ${
            activePage === 'dashboard' ? 'bg-gray-700' : 'hover:bg-gray-700'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActivePage('users')}
          className={`w-full text-left px-4 py-2 rounded transition-colors ${
            activePage === 'users' ? 'bg-gray-700' : 'hover:bg-gray-700'
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActivePage('herbalists')}
          className={`w-full text-left px-4 py-2 rounded transition-colors ${
            activePage === 'herbalists' ? 'bg-gray-700' : 'hover:bg-gray-700'
          }`}
        >
          Herbalists
        </button>
        <button
          onClick={() => setActivePage('admincontrol')}
          className={`w-full text-left px-4 py-2 rounded transition-colors ${
            activePage === 'admincontrol' ? 'bg-gray-700' : 'hover:bg-gray-700'
          }`}
        >
          Admin Control
        </button>
      </nav>
    </div>
  );

  // Render content based on activePage
  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage analytics={analytics} loading={loadingAnalytics} />;
      case 'users':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
            {loadingUsers ? (
              <div className="flex justify-center items-center h-32">Loading users...</div>
            ) : (
              <EnhancedUsersTable
                users={users}
                loading={loadingUsers}
                actionLoading={actionLoading}
                onSuspend={suspendUser}
                onUnsuspend={unsuspendUser}
                onRoleChange={updateRole}
                onHardDelete={hardDeleteUser}
                showRoleDropdown={true}
                showHardDelete={true}
              />
            )}
          </div>
        );
      case 'herbalists':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Herbalist Applications</h2>
            {loadingHerbalists ? (
              <div className="flex justify-center items-center h-32">Loading applications...</div>
            ) : (
              <HerbalistsTable
                herbalists={herbalists}
                loading={loadingHerbalists}
                actionLoading={actionLoading}
                onVerify={verifyHerbalist}
                onReject={rejectHerbalist}
                onUnverify={unverifyHerbalist}
              />
            )}
          </div>
        );
      case 'admincontrol':
        return (
          <AdminControlPage
            users={users}
            loadingUsers={loadingUsers}
            actionLoading={actionLoading}
            onRoleChange={updateRole}
            onHardDelete={hardDeleteUser}
            onSuspend={suspendUser}
            onUnsuspend={unsuspendUser}
            onCreateAdmin={createAdmin}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        {renderContent()}
      </div>
      <ToastComponent />
    </div>
  );
};

export default SuperAdminDashboard;