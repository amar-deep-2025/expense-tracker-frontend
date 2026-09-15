import axios from "axios";
const API_BASE_URl = import.meta.env.VITE_API_BASE_URL;
const getHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authorization token not found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};
export const getCurrentUser = async () => {
  const response = await axios.get(`${API_BASE_URl}/api/users/me`, {
    headers: getHeaders(),
  });
  return response.data;
};
