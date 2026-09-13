import { useState, useEffect } from "react";
import useExpense from "../../hooks/expense/useExpense";
import "./css/ExpenseList.css";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  const { getAll, loading, error } = useExpense();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getAll();
        setExpenses(response);
      } catch (err) {
        console.log("Failed to fetch expenses", err);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) {
    return <p className="expense-loading">Expense Loading...</p>;
  }

  if (error) {
    return <p className="expense-error">{error}</p>;
  }

  return (
    <div className="expense-list">
      <h2>All Expenses</h2>

      {expenses.length === 0 ? (
        <p className="expense-list-empty">No expenses found</p>
      ) : (
        expenses.map((expense) => (
          <div className="expense-card" key={expense.id}>
            <h3>{expense.name}</h3>

            <p className="expense-amount">Amount: ₹{expense.amount}</p>

            <p>Type: {expense.type}</p>

            <p>Category: {expense.category}</p>

            <p>Description: {expense.description}</p>

            <p>Created At: {new Date(expense.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ExpenseList;
