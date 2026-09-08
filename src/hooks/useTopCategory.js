import { useCallback, useEffect, useState } from "react";
import { getTopCategory } from "../services/dashboardService";

const useTopCategory = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardTopCategory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getTopCategory();
      setData(response);
    } catch (err) {
      setError(err.message || "Unable to load Top Category");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardTopCategory();
  }, [fetchDashboardTopCategory]);

  return {
    data,
    loading,
    error,
    refetch: fetchDashboardTopCategory,
  };
};
export default useTopCategory;
