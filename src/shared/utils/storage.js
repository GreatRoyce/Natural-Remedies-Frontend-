// src/utils/storage.js

export const setToken = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const setUser = (user) => {
  if (!user) return;
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setAccessToken = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
};

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const removeToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const removeUser = () => {
  localStorage.removeItem("user");
};
