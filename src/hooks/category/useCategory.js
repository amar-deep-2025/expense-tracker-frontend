import { useState } from "react";
import { getAllCategories } from "../../services/categories/categoryService";

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAll = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllCategories();

      setCategories(response);

      return response;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to fetch categories",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    getAll,
    loading,
    error,
  };
};

export default useCategory;
