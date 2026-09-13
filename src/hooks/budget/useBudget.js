import { useState } from "react";
import {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
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
  const getById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getBudgetById(id);
      return response;
    } catch (err) {
      console.log(err.response?.data?.message);
      console.log(err.response?.data);
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "failed to fetch Budget",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const update = async (id, expenseData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const response = await updateBudget(id, expenseData);
      setSuccess("Budget updated successfully");
      return response;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to fetch Budget",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return {
    create,
    getAll,
    getById,
    update,
    loading,
    error,
    success,
  };
};

export default useBudget;
