import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useExpense from "../../hooks/expense/useExpense";
import "./css/ExpenseDetails.css";

const ExpenseDetails = () => {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);

  const { getById, loading, error } = useExpense();

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
          <h2>Expense Details</h2>
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
          <button type="button" className="expense-edit-button">
            Edit
          </button>

          <button type="button" className="expense-delete-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetails;
