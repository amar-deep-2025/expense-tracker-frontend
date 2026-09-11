const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.setItem(
  "token",
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbWFyLmZ1bGxzdGFjazIwMjVAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzg5MDcwMjU1LCJleHAiOjE3ODkxMDYyNTV9.g-3PO4sqXR4hVt9E-yMwyCJHhsSiOOJwGGk_G0rPYno",
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

export const getCategorySummary = async (start, end) => {
  const response = await fetch(
    `${API_BASE_URL}/api/dashboard/category-summary?start=${start}&end=${end}`,
    {
      method: "GET",
      headers: getHeaders(),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch category summary");
  }
  return response.json();
};

export const getTopCategory = async () => {
  const response = await fetch(`${API_BASE_URL}/api/dashboard/top-category`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch top category");
  }
  return response.json();
};

export const getMonthlyComparison = async () => {
  const response = await fetch(`${API_BASE_URL}/api/dashboard/compare`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Monthly Comparison data");
  }

  return response.json();
};

export const getMonthlySummary = async (year) => {
  const response = await fetch(
    `${API_BASE_URL}/api/dashboard/monthly?year=${year}`,
    {
      method: "GET",
      headers: getHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch monthly summary");
  }

  return response.json();
};

export const getDashboardSummaryByDate = async (start, end) => {
  const response = await fetch(
    `${API_BASE_URL}/api/dashboard/summary-by-date?start=${start}&end=${end}`,
    {
      method: "GET",
      headers: getHeaders(),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard summary by date");
  }
  return response.json();
};
