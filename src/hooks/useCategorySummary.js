import { useCallback, useEffect } from "react";
import { getCategorySummary } from "../services/dashboardService";

const useCategorySummary = (start, end) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategorySummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getCategorySummary(start, end);
      setData(response);
    } catch (err) {
      setError(err.message || "Unable to load category summary");
    } finally {
      setLoading(false);
    }
  }, [start, end]);

  useEffect(() => {
    fetchCategorySummary();
  }, [fetchCategorySummary]);

  return {
    data,
    loading,
    error,
    refetch: fetchCategorySummary,
  };
};

export default useCategorySummary;
