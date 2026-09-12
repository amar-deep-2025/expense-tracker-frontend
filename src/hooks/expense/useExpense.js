import { useState } from "react";
import { createExpense } from "../../services/expense/expenseService";
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

  return {
    create,
    loading,
    error,
    success,
  };
};

export default useExpense;
