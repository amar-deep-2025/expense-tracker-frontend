import { useState } from "react";

import {
  downloadSummaryReport,
  downloadCategoryReport,
  downloadFullReport,
  downloadMonthlyReport,
  downloadYearlyReport,
  downloadBudgetReport,
} from "../../services/download/reportService";

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

  const downloadCategory = async () => {
    try {
      setLoading(true);
      setError(null);

      await downloadCategoryReport();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to download category report",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const downloadFull = async () => {
    try {
      setLoading(true);
      setError(null);

      await downloadFullReport();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to download full report",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const downloadMonthly = async () => {
    try {
      setLoading(true);
      setError(null);

      await downloadMonthlyReport();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to download monthly report",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const downloadYearly = async (year) => {
    try {
      setLoading(true);
      setError(null);

      await downloadYearlyReport(year);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to download yearly report",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const downloadBudget = async () => {
    try {
      setLoading(true);
      setError(null);

      await downloadBudgetReport();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to download budget report",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    downloadSummary,
    downloadCategory,
    downloadFull,
    downloadMonthly,
    downloadYearly,
    downloadBudget,
    loading,
    error,
  };
};

export default useReport;
