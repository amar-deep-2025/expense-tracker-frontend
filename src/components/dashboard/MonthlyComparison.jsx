import "./css/MonthlyComparison.css";

const MonthlyComparison = ({ monthlyComparison, formatCurrency }) => {
  if (!monthlyComparison) {
    return <p className="monthly-comparison-empty">Unable to find expenses</p>;
  }

  return (
    <div className="monthly-comparison">
      <div className="monthly-comparison-item">
        <span className="monthly-comparison-label">Current Month</span>
        <span className="monthly-comparison-value">
          {formatCurrency(monthlyComparison.currentMonthExpenses)}
        </span>
      </div>

      <div className="monthly-comparison-item">
        <span className="monthly-comparison-label">Last Month</span>
        <span className="monthly-comparison-value">
          {formatCurrency(monthlyComparison.lastMonthExpenses)}
        </span>
      </div>

      <div className="monthly-comparison-item">
        <span className="monthly-comparison-label">Difference</span>
        <span className="monthly-comparison-value">
          {formatCurrency(monthlyComparison.difference)}
        </span>
      </div>

      <div className="monthly-comparison-item">
        <span className="monthly-comparison-label">Change</span>
        <span className="monthly-comparison-value">
          {monthlyComparison.percentageChange}%
        </span>
      </div>

      <div className="monthly-comparison-status">
        <span className="monthly-comparison-label">Status</span>
        <span className="monthly-comparison-status-value">
          {monthlyComparison.status}
        </span>
      </div>
    </div>
  );
};

export default MonthlyComparison;
