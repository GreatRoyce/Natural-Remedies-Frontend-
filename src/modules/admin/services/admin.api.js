const API_BASE =
  import.meta?.env?.VITE_API_URL || "http://localhost:3000/api";
const API = `${API_BASE}/admin`;

const apiFetch = async (url, options = {}) => {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const getAnalytics = async () => {
  const res = await apiFetch(`${API}/analytics`);
  return res.data;
};

export const getUsers = async () => {
  const res = await apiFetch(`${API}/users`);
  return res.data;
};

export const getHerbalists = async () => {
  const res = await apiFetch(`${API}/herbalists?applied=true`);
  return res.data;
};

export const suspendUser = (id) =>
  apiFetch(`${API}/users/${id}/suspend`, { method: "PATCH" });

export const unsuspendUser = (id) =>
  apiFetch(`${API}/users/${id}/unsuspend`, { method: "PATCH" });

export const verifyHerbalist = (id) =>
  apiFetch(`${API}/herbalists/${id}/verify`, { method: "PATCH" });

export const rejectHerbalist = (id) =>
  apiFetch(`${API}/herbalists/${id}/reject`, { method: "PATCH" });

export const unverifyHerbalist = (id) =>
  apiFetch(`${API}/herbalists/${id}/unverify`, { method: "PATCH" });
