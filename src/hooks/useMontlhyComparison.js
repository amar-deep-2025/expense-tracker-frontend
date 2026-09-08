import { useCallback, useEffect, useState } from "react";
import { getMonthlyComparison } from "../services/dashboardService";

const useMonthlyComparison = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMonthlyComparisonSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMonthlyComparison();
      setData(response);
    } catch (err) {
      setError(err.message || "Unable to fetch monthly comparison data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMonthlyComparisonSummary();
  }, [fetchMonthlyComparisonSummary]);

  return {
    data,
    loading,
    error,
    refetch: fetchMonthlyComparisonSummary,
  };
};

export default useMonthlyComparison;
