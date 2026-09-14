import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getAllCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/categories`, {
    headers: getHeaders(),
  });

  return response.data;
};
