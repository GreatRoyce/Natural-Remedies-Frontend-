import { Routes, Route } from "react-router-dom";
import SuperAdminLayout from "./components/SuperAdminLayout";

import Dashboard from "./pages/Dashboard";
import ManageAdmins from "./pages/ManageAdmins";
import SystemControl from "./pages/SystemControl";
import {
  createAdmin,
  getHerbalists,
  getUsers,
  hardDeleteUser,
  rejectHerbalist,
  suspendUser,
  unsuspendUser,
  unverifyHerbalist,
  updateRole,
  verifyHerbalist,
} from "./services/superAdmin.api";
import { useEffect, useState } from "react";

const SuperAdmin = () => {
  const [users, setUsers] = useState([]);
  const [herbalists, setHerbalists] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingHerbalists, setLoadingHerbalists] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
    setLoadingUsers(false);
  };

  const fetchHerbalists = async () => {
    const data = await getHerbalists();
    setHerbalists(data);
    setLoadingHerbalists(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
    fetchHerbalists();
  }, []);

  const withAction = async (id, action) => {
    setActionLoading((p) => ({ ...p, [id]: true }));
    await action();
    setActionLoading((p) => ({ ...p, [id]: false }));
  };

  const handleRoleChange = (id, role) =>
    withAction(id, async () => {
      await updateRole(id, role);
      await fetchUsers();
    });

  const handleHardDelete = (id) =>
    withAction(id, async () => {
      await hardDeleteUser(id);
      await fetchUsers();
    });

  const handleSuspend = (id) =>
    withAction(id, async () => {
      await suspendUser(id);
      await fetchUsers();
    });

  const handleUnsuspend = (id) =>
    withAction(id, async () => {
      await unsuspendUser(id);
      await fetchUsers();
    });

  const handleVerify = (id) =>
    withAction(id, async () => {
      await verifyHerbalist(id);
      await fetchHerbalists();
    });

  const handleReject = (id) =>
    withAction(id, async () => {
      await rejectHerbalist(id);
      await fetchHerbalists();
    });

  const handleUnverify = (id) =>
    withAction(id, async () => {
      await unverifyHerbalist(id);
      await fetchHerbalists();
    });

  return (
    <SuperAdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route
          path="manage"
          element={
            <ManageAdmins
              users={users}
              loadingUsers={loadingUsers}
              actionLoading={actionLoading}
              onRoleChange={handleRoleChange}
              onHardDelete={handleHardDelete}
              onSuspend={handleSuspend}
              onUnsuspend={handleUnsuspend}
              onCreateAdmin={createAdmin}
            />
          }
        />
        <Route
          path="system"
          element={
            <SystemControl
              herbalists={herbalists}
              loadingHerbalists={loadingHerbalists}
              actionLoading={actionLoading}
              onVerify={handleVerify}
              onReject={handleReject}
              onUnverify={handleUnverify}
            />
          }
        />
      </Routes>
    </SuperAdminLayout>
  );
};

export default SuperAdmin;
