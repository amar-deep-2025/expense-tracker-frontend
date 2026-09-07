import { useCallback, useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardService";

const useDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getDashboardSummary();
      setData(response);
    } catch (err) {
      setError(err.message || "Unable to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardSummary();
  }, [fetchDashboardSummary]);

  return {
    data,
    loading,
    error,
    refetch: fetchDashboardSummary,
  };
};

export default useDashboard;
