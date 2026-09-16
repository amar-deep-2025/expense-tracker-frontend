import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authorization token not found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};
export const askAI = async (prompt) => {
  const response = await axios.get(`${API_BASE_URL}/api/ai/custom`, {
    params: {
      prompt,
    },
    headers: getHeaders(),
  });
  return response.data;
};
