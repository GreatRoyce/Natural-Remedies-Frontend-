// src/utils/auth.js
import api from "./api";
import { setToken, removeToken, setUser, removeUser } from "./storage";

export const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  const { accessToken, refreshToken, data } = res.data;
  setToken(accessToken, refreshToken);
  const user = data?.user || data;
  setUser(user);
  return user;
};

export const register = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

export const logout = () => {
  removeToken();
  removeUser();
  window.location.href = "/auth";
};

export const refreshAccessToken = async () => {
  const res = await api.post("/auth/refresh", { refreshToken: localStorage.getItem("refreshToken") });
  setToken(res.data.accessToken, res.data.refreshToken || localStorage.getItem("refreshToken"));
  return res.data.accessToken;
};
