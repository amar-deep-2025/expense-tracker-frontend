import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/register`,
    userData,
  );
  return response.data;
};

export const verifyOtp = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/verify-otp`,
    requestData,
  );
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/login`,
    loginData,
  );
  return response.data;
};
export const forgotPassword = async (email) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/forgot-password`,
    email,
  );
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/reset-password`,
    data,
  );
  return response.data;
};
export const logoutUser = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
