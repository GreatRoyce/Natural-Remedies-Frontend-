import api from "../../../shared/utils/api";

const API_ADMIN = "/admin";
const API_SUPER = "/super-admin";

// Analytics
export const getAnalytics = async () => {
  const res = await api.get(`${API_ADMIN}/analytics`);
  return res.data?.data ?? res.data;
};

// Users
export const getUsers = async () => {
  const res = await api.get(`${API_ADMIN}/users`);
  return res.data?.data ?? res.data;
};

export const suspendUser = (id) =>
  api.patch(`${API_ADMIN}/users/${id}/suspend`);

export const unsuspendUser = (id) =>
  api.patch(`${API_ADMIN}/users/${id}/unsuspend`);

// Super Admin actions
export const updateRole = (userId, role) =>
  api.patch(`${API_SUPER}/update-role`, { userId, role });

export const hardDeleteUser = (userId) =>
  api.delete(`${API_SUPER}/delete-user`, { data: { userId } });

export const createAdmin = (data) =>
  api.post(`${API_SUPER}/create-admin`, data);

export const hardDeleteRemedy = (remedyId) =>
  api.delete(`${API_SUPER}/delete-remedy`, { data: { remedyId } });

// Herbalists
export const getHerbalists = async () => {
  const res = await api.get(`${API_ADMIN}/herbalists`, {
    params: { applied: true },
  });
  return res.data?.data ?? res.data;
};

export const verifyHerbalist = (id) =>
  api.patch(`${API_ADMIN}/herbalists/${id}/verify`);

export const rejectHerbalist = (id) =>
  api.patch(`${API_ADMIN}/herbalists/${id}/reject`);

export const unverifyHerbalist = (id) =>
  api.patch(`${API_ADMIN}/herbalists/${id}/unverify`);
