import "./css/MonthlySummary.css";

const MonthlySummary = ({
  monthlySummary,
  loading,
  error,
  refetch,
  formatCurrency,
}) => {
  if (loading) {
    return (
      <p className="monthly-summary-loading">Loading monthly summary...</p>
    );
  }

  if (error) {
    return (
      <div className="monthly-summary-error">
        <p>{error}</p>

        <button type="button" onClick={refetch}>
          Retry
        </button>
      </div>
    );
  }

  if (!monthlySummary || monthlySummary.length === 0) {
    return (
      <p className="monthly-summary-empty">
        Monthly summary data is not available.
      </p>
    );
  }
  const getMonthName = (month) => {
    return new Date(2000, month - 1).toLocaleString("default", {
      month: "long",
    });
  };
  return (
    <div className="monthly-summary-list">
      {monthlySummary.map((item) => (
        <div className="monthly-summary-item" key={item.month}>
          <span className="monthly-summary-month">
            {getMonthName(item.month)}
          </span>

          <span className="monthly-summary-income">
            {formatCurrency(item.income)}
          </span>

          <span className="monthly-summary-expense">
            {formatCurrency(item.expense)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MonthlySummary;
