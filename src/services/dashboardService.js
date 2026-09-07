const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.setItem(
  "token",
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbWFyLmZ1bGxzdGFjazIwMjVAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzg4ODExMzU0LCJleHAiOjE3ODg4NDczNTR9.7QZcHUK-O1Ffn0OOEF4EHV7JuZ0fi5K9CuiYJRG2xdA",
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
