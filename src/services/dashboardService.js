const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.setItem(
  "token",
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbWFyLmZ1bGxzdGFjazIwMjVAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzg4Nzc1MjI1LCJleHAiOjE3ODg4MTEyMjV9.5StJ4a5VB3S1M_zQ7Tj7mNVHaTTqusW-SH6QQaYZNlQ",
);

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

export const getDashboardSummary = async () => {
  const response = await fetch(`${API_BASE_URL}/api/dashboard/summary`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard summary");
  }
  return response.json();
};
