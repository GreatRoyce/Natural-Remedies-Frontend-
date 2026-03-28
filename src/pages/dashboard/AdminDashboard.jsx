import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  // Active page state
  const [activePage, setActivePage] = useState('dashboard');
  // Data states
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [herbalists, setHerbalists] = useState([]);
  // Loading states
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingHerbalists, setLoadingHerbalists] = useState(true);
  // Action loading per user/herbalist id
  const [actionLoading, setActionLoading] = useState({});
  // Toast notification
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Helper: show toast message
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  // Helper: API fetch wrapper
  const apiFetch = async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  };

  // Fetch analytics for dashboard
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

  // Fetch all users
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

  // Fetch herbalists (users who applied as herbalist)
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

  // Fetch data when page changes
  useEffect(() => {
    if (activePage === 'dashboard') {
      fetchAnalytics();
    } else if (activePage === 'users') {
      fetchUsers();
    } else if (activePage === 'herbalists') {
      fetchHerbalists();
    }
  }, [activePage]);

  // User actions
  const suspendUser = async (userId) => {
    setActionLoading(prev => ({ ...prev, [userId]: true }));
    try {
      await apiFetch(`/api/admin/users/${userId}/suspend`, { method: 'PATCH' });
      showToast('User suspended');
      fetchUsers(); // refresh list
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

  // Herbalist actions
  const verifyHerbalist = async (userId) => {
    setActionLoading(prev => ({ ...prev, [userId]: true }));
    try {
      await apiFetch(`/api/admin/herbalists/${userId}/verify`, { method: 'PATCH' });
      showToast('Herbalist verified');
      fetchHerbalists(); // refresh
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

  // Render sidebar
  const Sidebar = () => (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-gray-700">Admin Panel</div>
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
      </nav>
    </div>
  );

  // Dashboard page
  const DashboardPage = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">System Overview</h2>
      {loadingAnalytics ? (
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

  const MetricCard = ({ title, value }) => (
    <div className="bg-white shadow rounded-lg p-4 border">
      <div className="text-gray-500 text-sm uppercase tracking-wide">{title}</div>
      <div className="text-3xl font-bold mt-1">{value ?? 0}</div>
    </div>
  );

  // Users page
  const UsersPage = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      {loadingUsers ? (
        <div className="flex justify-center items-center h-32">Loading users...</div>
      ) : (
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
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.isSuspended ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.isSuspended ? 'Suspended' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {!user.isSuspended ? (
                      <button
                        onClick={() => suspendUser(user.id)}
                        disabled={actionLoading[user.id]}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        {actionLoading[user.id] ? 'Suspending...' : 'Suspend'}
                      </button>
                    ) : (
                      <button
                        onClick={() => unsuspendUser(user.id)}
                        disabled={actionLoading[user.id]}
                        className="text-green-600 hover:text-green-800 disabled:opacity-50"
                      >
                        {actionLoading[user.id] ? 'Unsuspending...' : 'Unsuspend'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  // Herbalists page
  const HerbalistsPage = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Herbalist Applications</h2>
      {loadingHerbalists ? (
        <div className="flex justify-center items-center h-32">Loading applications...</div>
      ) : (
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
                        onClick={() => verifyHerbalist(herbalist.id)}
                        disabled={actionLoading[herbalist.id]}
                        className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                      >
                        {actionLoading[herbalist.id] ? 'Verifying...' : 'Verify'}
                      </button>
                    )}
                    {herbalist.verificationStatus === 'verified' && (
                      <button
                        onClick={() => unverifyHerbalist(herbalist.id)}
                        disabled={actionLoading[herbalist.id]}
                        className="text-orange-600 hover:text-orange-800 disabled:opacity-50"
                      >
                        {actionLoading[herbalist.id] ? 'Unverifying...' : 'Unverify'}
                      </button>
                    )}
                    {herbalist.verificationStatus !== 'rejected' && (
                      <button
                        onClick={() => rejectHerbalist(herbalist.id)}
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
      )}
    </div>
  );

  // Main render
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        {activePage === 'dashboard' && <DashboardPage />}
        {activePage === 'users' && <UsersPage />}
        {activePage === 'herbalists' && <HerbalistsPage />}
      </div>
      {/* Toast */}
      {toast.show && (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg text-white ${
          toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        }`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;