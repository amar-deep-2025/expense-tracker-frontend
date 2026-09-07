import useDashboard from "../hooks/useDashboard";

const Dashboard = () => {
  const { data, loading, error, refetch } = useDashboard();

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>

        <button type="button" onClick={refetch}>
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return <div>No dashboard data available.</div>;
  }

  return (
    <main>
      <h1>Dashboard</h1>

      {/* Financial Summary */}
      <section>
        <h2>Financial Summary</h2>

        <div>
          <p>Total Income</p>
          <p>{data.totalIncome}</p>
        </div>

        <div>
          <p>Total Expense</p>
          <p>{data.totalExpense}</p>
        </div>

        <div>
          <p>Balance</p>
          <p>{data.balance}</p>
        </div>

        <div>
          <p>Total Budget</p>
          <p>{data.totalBudget}</p>
        </div>

        <div>
          <p>Budget Remaining</p>
          <p>{data.budgetRemaining}</p>
        </div>

        <div>
          <p>Monthly Expense</p>
          <p>{data.monthlyExpense}</p>
        </div>

        <div>
          <p>Today's Expense</p>
          <p>{data.todayExpense}</p>
        </div>
      </section>

      {/* Category Summary */}
      <section>
        <h2>Category Summary</h2>

        {Object.keys(data.categorySummary).length === 0 ? (
          <p>No category data available.</p>
        ) : (
          Object.entries(data.categorySummary).map(([category, amount]) => (
            <div key={category}>
              <p>{category}</p>
              <p>{amount}</p>
            </div>
          ))
        )}
      </section>

      {/* Recent Expenses */}
      <section>
        <h2>Recent Expenses</h2>

        {data.recentExpenses.length === 0 ? (
          <p>No recent expenses available.</p>
        ) : (
          data.recentExpenses.map((expense) => (
            <div key={expense.id}>
              <p>{expense.name}</p>
              <p>{expense.category}</p>
              <p>{expense.amount}</p>
              <p>{expense.type}</p>
            </div>
          ))
        )}
      </section>

      {/* AI Insight */}
      <section>
        <h2>AI Insight</h2>
        <p>{data.aiInsight || "No AI insight available."}</p>
      </section>
    </main>
  );
};

export default Dashboard;
