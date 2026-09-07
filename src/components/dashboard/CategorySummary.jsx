import "./css/CategorySummary.css";
const CategorySummary = ({ categorySummary, formatCurrency }) => {
  const entries = Object.entries(categorySummary ?? {});

  if (entries.length === 0) {
    return (
      <p className="category-summary-empty">No category data available.</p>
    );
  }

  const total = entries.reduce(
    (sum, [, amount]) => sum + Number(amount || 0),
    0,
  );

  return (
    <div className="category-summary-list">
      {entries.map(([category, amount]) => {
        const percentage = total > 0 ? (Number(amount) / total) * 100 : 0;

        return (
          <div className="category-summary-item" key={category}>
            <div className="category-summary-top">
              <span className="category-summary-name">{category}</span>

              <span className="category-summary-amount">
                {formatCurrency(amount)}
              </span>
            </div>

            <div className="category-summary-progress">
              <div
                className="category-summary-progress-bar"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <span className="category-summary-percentage">
              {percentage.toFixed(1)}%
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CategorySummary;
