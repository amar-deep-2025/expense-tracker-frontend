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
export const downloadSummaryPdf = () => {
  throw new Error("Summary PDF download is under development");
};
