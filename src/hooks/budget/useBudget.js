import { useState } from "react";
import {
  createBudget,
  getAllBudgets,
} from "../../services/budget/budgetService";
import { useNavigate } from "react-router-dom";

const useBudget = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const create = async (budgetData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await createBudget(budgetData);

      setSuccess("Budget created successfully");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

      return response;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to create budget",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };
  const getAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllBudgets();
      return response;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "failed to fetch budgets",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    create,
    getAll,
    loading,
    error,
    success,
  };
};

export default useBudget;
