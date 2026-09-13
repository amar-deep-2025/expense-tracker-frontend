import { useState } from "react";
import {
  createExpense,
  getAllExpenses,
  getExpenseById,
} from "../../services/expense/expenseService";
import { useNavigate } from "react-router-dom";

const useExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const create = async (expenseData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await createExpense(expenseData);

      setSuccess("Expense created successfully");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

      return response;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to create expense",
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
      const response = await getAllExpenses();
      return response;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "failed to fetch expenses",
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
      const response = await getExpenseById(id);
      return response;
    } catch (err) {
      console.log(err.response?.data?.message);
      console.log(err.response?.data);
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "failed to fetch expense",
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
    loading,
    error,
    success,
  };
};

export default useExpense;
