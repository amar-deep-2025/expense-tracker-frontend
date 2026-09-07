import "./css/RecentExpenses.css";
const RecentExpenses = ({ expenses, formatCurrency }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="recent-expenses-empty">
        <p>No recent expenses available.</p>
      </div>
    );
  }

  return (
    <div className="recent-expenses-list">
      {expenses.map((expense) => (
        <article className="recent-expense-item" key={expense.id}>
          <div className="recent-expense-info">
            <h3>{expense.name}</h3>
            <span>{expense.category}</span>
          </div>

          <div className="recent-expense-details">
            <span className="recent-expense-amount">
              {formatCurrency(expense.amount)}
            </span>

            <span className="recent-expense-type">{expense.type}</span>
          </div>
        </article>
      ))}
    </div>
  );
};

export default RecentExpenses;
