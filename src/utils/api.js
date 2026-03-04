// src/utils/api.js
import axios from "axios";
import { getAccessToken, getRefreshToken, setAccessToken } from "./storage";
import { logout } from "./auth";

const BASE_URL = import.meta?.env?.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // for cookies if needed
});

// --------------------
// REQUEST INTERCEPTOR
// --------------------
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --------------------
// RESPONSE INTERCEPTOR
// --------------------
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject({ message: "Network error. Check your connection." });
    }

    const { status } = error.response;

    // 401 → try refresh
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          logout();
          return Promise.reject(error);
        }

        const res = await axios.post(
          `${BASE_URL}/auth/refresh`,
          { refreshToken },
          { withCredentials: true }
        );

        const { accessToken } = res.data;
        setAccessToken(accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }

    if (status === 403) console.warn("Forbidden");
    if (status >= 500) console.error("Server error");

    return Promise.reject(error);
  }
);

export default api;