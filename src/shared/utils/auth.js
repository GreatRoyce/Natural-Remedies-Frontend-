// src/utils/auth.js
import api from "./api";
import { setToken, removeToken } from "./storage";

export const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  const { accessToken, refreshToken, data } = res.data;
  setToken(accessToken, refreshToken);
  return data;
};

export const register = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

export const logout = () => {
  removeToken();
  window.location.href = "/auth";
};

export const refreshAccessToken = async () => {
  const res = await api.post("/auth/refresh", { refreshToken: localStorage.getItem("refreshToken") });
  setToken(res.data.accessToken, res.data.refreshToken || localStorage.getItem("refreshToken"));
  return res.data.accessToken;
};
