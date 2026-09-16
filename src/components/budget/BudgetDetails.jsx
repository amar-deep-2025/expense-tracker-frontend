import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useBudget from "../../hooks/budget/useBudget";
import formatCurrency from "../../utils/formatCurrency";
import "./css/BudgetDetails.css";

const BudgetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [budget, setBudget] = useState(null);

  const { remove, getById, loading, error } = useBudget();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this budget?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await remove(id);

      toast.success(response?.message || "Budget deleted successfully");

      setTimeout(() => {
        navigate("/budgets");
      }, 2000);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to delete budget",
      );
    }
  };

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await getById(id);
        setBudget(response);
      } catch (err) {
        console.log("Failed to fetch budget", err);
      }
    };

    fetchBudget();
  }, [id]);

  if (loading) {
    return <p className="budget-details-loading">Loading Budget...</p>;
  }

  if (error) {
    return <p className="budget-details-error">{error}</p>;
  }

  if (!budget) {
    return <p className="budget-details-empty">Budget not found.</p>;
  }

  return (
    <div className="budget-details-page">
      <div className="budget-details-card">
        <div className="budget-details-header">
          <h2>Budget Details</h2>

          <span className={`budget-type ${budget.type.toLowerCase()}`}>
            {budget.type}
          </span>
        </div>

        <div className="budget-details-content">
          <div className="budget-detail-item">
            <span>Name</span>
            <strong>{budget.name}</strong>
          </div>

          <div className="budget-detail-item">
            <span>Budget</span>
            <strong>{formatCurrency(budget.budget)}</strong>
          </div>

          <div className="budget-detail-item">
            <span>Month</span>
            <strong>{budget.month}</strong>
          </div>

          <div className="budget-detail-item">
            <span>Year</span>
            <strong>{budget.year}</strong>
          </div>

          <div className="budget-detail-item">
            <span>Category</span>
            <strong>{budget.categoryName || "Overall"}</strong>
          </div>
        </div>

        <div className="budget-details-actions">
          <button
            type="button"
            className="budget-edit-button"
            onClick={() => navigate(`/budgets/${id}/edit`)}
          >
            Edit
          </button>

          <button
            type="button"
            className="budget-delete-button"
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

export default BudgetDetails;
