const API_BASE =
  import.meta?.env?.VITE_API_URL || "http://localhost:3000/api";
const API_ADMIN = `${API_BASE}/admin`;
const API_SUPER = `${API_BASE}/super-admin`;

const apiFetch = async (url, options = {}) => {
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `HTTP ${res.status}`);
  }

  return res.json();
};

// Analytics
export const getAnalytics = async () => {
  const res = await apiFetch(`${API_ADMIN}/analytics`);
  return res.data;
};

// Users
export const getUsers = async () => {
  const res = await apiFetch(`${API_ADMIN}/users`);
  return res.data;
};

export const suspendUser = (id) =>
  apiFetch(`${API_ADMIN}/users/${id}/suspend`, { method: "PATCH" });

export const unsuspendUser = (id) =>
  apiFetch(`${API_ADMIN}/users/${id}/unsuspend`, { method: "PATCH" });

// Super Admin actions
export const updateRole = (userId, role) =>
  apiFetch(`${API_SUPER}`, {
    method: "PATCH",
    body: JSON.stringify({ userId, role }),
  });

export const hardDeleteUser = (userId) =>
  apiFetch(`${API_SUPER}`, {
    method: "DELETE",
    body: JSON.stringify({ userId }),
  });

export const createAdmin = (data) =>
  apiFetch(`${API_SUPER}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// Herbalists
export const getHerbalists = async () => {
  const res = await apiFetch(`${API_ADMIN}/herbalists?applied=true`);
  return res.data;
};

export const verifyHerbalist = (id) =>
  apiFetch(`${API_ADMIN}/herbalists/${id}/verify`, { method: "PATCH" });

export const rejectHerbalist = (id) =>
  apiFetch(`${API_ADMIN}/herbalists/${id}/reject`, { method: "PATCH" });

export const unverifyHerbalist = (id) =>
  apiFetch(`${API_ADMIN}/herbalists/${id}/unverify`, { method: "PATCH" });
