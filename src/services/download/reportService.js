import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

// Summary Report
export const downloadSummaryReport = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/report/download/summary`,
    {
      params: {
        format: "excel",
      },
      headers: getHeaders(),
      responseType: "blob",
    },
  );

  const blob = new Blob([response.data]);
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "summary_report.xlsx";

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};

// Category Report
export const downloadCategoryReport = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/report/download/category`,
    {
      params: {
        format: "excel",
      },
      headers: getHeaders(),
      responseType: "blob",
    },
  );

  const blob = new Blob([response.data]);
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "category_report.xlsx";

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};

// Full Report
export const downloadFullReport = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/report/download/full`, {
    params: {
      format: "excel",
    },
    headers: getHeaders(),
    responseType: "blob",
  });

  const blob = new Blob([response.data]);
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "full_report.xlsx";

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};

// Monthly Report
export const downloadMonthlyReport = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/report/download/monthly`,
    {
      params: {
        format: "excel",
      },
      headers: getHeaders(),
      responseType: "blob",
    },
  );

  const blob = new Blob([response.data]);
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "monthly_report.xlsx";

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};

// Yearly Report
export const downloadYearlyReport = async (year) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/report/download/yearly`,
    {
      params: {
        format: "excel",
        year: year,
      },
      headers: getHeaders(),
      responseType: "blob",
    },
  );

  const blob = new Blob([response.data]);
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "yearly_report.xlsx";

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};

// Budget Report
export const downloadBudgetReport = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/report/download/budget`,
    {
      params: {
        format: "excel",
      },
      headers: getHeaders(),
      responseType: "blob",
    },
  );

  const blob = new Blob([response.data]);
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "budget_report.xlsx";

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};

// PDF - Under Development
export const downloadSummaryPdf = () => {
  throw new Error("Summary PDF report is under development");
};

export const downloadCategoryPdf = () => {
  throw new Error("Category PDF report is under development");
};

export const downloadFullPdf = () => {
  throw new Error("Full PDF report is under development");
};

export const downloadMonthlyPdf = () => {
  throw new Error("Monthly PDF report is under development");
};

export const downloadYearlyPdf = () => {
  throw new Error("Yearly PDF report is under development");
};

export const downloadBudgetPdf = () => {
  throw new Error("Budget PDF report is under development");
};
