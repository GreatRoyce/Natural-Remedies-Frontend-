// // src/services/auth.service.js
// import api from "../utils/api";

// /* --------------------------------------------------
//    Auth Service Functions
// -------------------------------------------------- */

// /**
//  * Register a new user
//  * @param {Object} data - { email, password, confirmPassword }
//  */
// export const register = async (data) => {
//   try {
//     const res = await api.post("/auth/register", data);
//     return res.data;
//   } catch (err) {
//     throw err.response?.data || err;
//   }
// };

// /**
//  * Login a user
//  * @param {Object} data - { email, password }
//  */
// export const login = async (data) => {
//   try {
//     const res = await api.post("/auth/login", data);
//     return res.data;
//   } catch (err) {
//     throw err.response?.data || err;
//   }
// };

// /**
//  * Verify user's email
//  * @param {Object} data - { email, code }
//  */
// export const verifyEmail = async (data) => {
//   try {
//     const res = await api.post("/auth/verify-email", data);
//     return res.data;
//   } catch (err) {
//     throw err.response?.data || err;
//   }
// };

// /**
//  * Resend verification code
//  * @param {Object} data - { email }
//  */
// export const resendVerificationCode = async (data) => {
//   try {
//     const res = await api.post("/auth/resend-code", data);
//     return res.data;
//   } catch (err) {
//     throw err.response?.data || err;
//   }
// };

// /**
//  * Forgot password
//  * @param {Object} data - { email }
//  */
// export const forgotPassword = async (data) => {
//   try {
//     const res = await api.post("/auth/forgot-password", data);
//     return res.data;
//   } catch (err) {
//     throw err.response?.data || err;
//   }
// };

// /**
//  * Reset password
//  * @param {Object} data - { email, code, newPassword }
//  */
// export const resetPassword = async (data) => {
//   try {
//     const res = await api.post("/auth/reset-password", data);
//     return res.data;
//   } catch (err) {
//     throw err.response?.data || err;
//   }
// };

// export default {
//   register,
//   login,
//   verifyEmail,
//   resendVerificationCode,
//   forgotPassword,
//   resetPassword,
// };
