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
export const createExpense = async (expenseData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/expenses`,
    expenseData,
    {
      headers: getHeaders(),
    },
  );

  return response.data;
};

export const getAllExpenses = async () => {
  const response = await axios.post(`${API_BASE_URL}/api/expense`, {
    headers: getHeaders(),
  });
  return response.data;
};
