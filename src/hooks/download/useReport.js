import { useState } from "react";
import { downloadSummaryReport } from "../../services/download/reportService";

const useReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const downloadSummary = async () => {
    try {
      setLoading(true);
      setError(null);

      await downloadSummaryReport();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to download summary report",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const downloadSummaryPdf = () => {
    throw new Error("Summary PDF download is under development");
  };

  return {
    downloadSummary,
    downloadSummaryPdf,
    loading,
    error,
  };
};

export default useReport;
