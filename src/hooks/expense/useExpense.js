import { useState } from "react";
import {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
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
  const update = async (id, expenseData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const response = await updateExpense(id, expenseData);
      setSuccess("Expense updated successfully");
      return response;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to fetch expense",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const remove = async (id) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const response = await deleteExpense(id);
      setSuccess(response?.message || " Transaction deleted successfully");
      return response;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to delete Transaction",
      );
      throw err;
    }finally{
      setLoading(false);
    }
  };
  return {
    create,
    getAll,
    getById,
    update,
    remove,
    loading,
    error,
    success,
  };
};

export default useExpense;
