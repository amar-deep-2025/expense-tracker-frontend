import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useExpense from "../../hooks/expense/useExpense";
import "./css/ExpenseDetails.css";

const ExpenseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState(null);

  const { remove, getById, loading, error } = useExpense();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await remove(id);

      toast.success(response?.message || "Transaction deleted successfully");

      setTimeout(() => {
        navigate("/expenses");
      }, 2000);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to delete transaction",
      );
    }
  };

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await getById(id);
        setExpense(response);
      } catch (err) {
        console.log("Failed to fetch expense", err);
      }
    };

    fetchExpense();
  }, [id]);

  if (loading) {
    return <p className="expense-details-loading">Loading expense...</p>;
  }

  if (error) {
    return <p className="expense-details-error">{error}</p>;
  }

  if (!expense) {
    return <p className="expense-details-empty">Expense not found.</p>;
  }

  return (
    <div className="expense-details-page">
      <div className="expense-details-card">
        <div className="expense-details-header">
          <h2>Transaction Details</h2>

          <span className={`expense-type ${expense.type.toLowerCase()}`}>
            {expense.type}
          </span>
        </div>

        <div className="expense-details-content">
          <div className="expense-detail-item">
            <span>Name</span>
            <strong>{expense.name}</strong>
          </div>

          <div className="expense-detail-item">
            <span>Amount</span>
            <strong>₹{expense.amount}</strong>
          </div>

          <div className="expense-detail-item">
            <span>Category</span>
            <strong>{expense.category}</strong>
          </div>

          <div className="expense-detail-item">
            <span>Description</span>
            <strong>{expense.description}</strong>
          </div>

          <div className="expense-detail-item">
            <span>Created At</span>
            <strong>{new Date(expense.createdAt).toLocaleString()}</strong>
          </div>

          <div className="expense-detail-item">
            <span>Updated At</span>
            <strong>{new Date(expense.updatedAt).toLocaleString()}</strong>
          </div>
        </div>

        <div className="expense-details-actions">
          <button
            type="button"
            className="expense-edit-button"
            onClick={() => navigate(`/expenses/${id}/edit`)}
          >
            Edit
          </button>

          <button
            type="button"
            className="expense-delete-button"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetails;
