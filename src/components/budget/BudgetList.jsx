import { useState, useEffect } from "react";

import useBudget from "../../hooks/budget/useBudget";
import { Link } from "react-router-dom";
import "./css/BudgetList.css";
const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);

  const { getAll, loading, error } = useBudget();

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await getAll();
        setBudgets(response);
      } catch (err) {
        console.log("Failed to fetch budgets", err);
      }
    };

    fetchBudgets();
  }, []);

  if (loading) {
    return <p className="budget-loading">Budgets Loading...</p>;
  }

  if (error) {
    return <p className="budget-error">{error}</p>;
  }

  return (
    <div className="budget-list">
      <h2>All Budgets</h2>

      {budgets.length === 0 ? (
        <p className="budget-list-empty">No Budgets found</p>
      ) : (
        budgets.map((budget) => (
          <div className="budget-card" key={budget.id}>
            <h3>{budget.name}</h3>

            <p className="budget-amount">Budget: ₹{budget.budget}</p>

            <p>Type: {budget.type}</p>

            <p>Month: {budget.month}</p>

            <p>Year: {budget.year}</p>

            <p>Category: {budget.categoryName || "Overall"}</p>

            <Link to={`/budgets/${budget.id}`} className="budget-details-link">
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default BudgetList;
