import "./css/CategorySummary.css";

const CategorySummary = ({ categorySummary, formatCurrency }) => {
  const entries = Array.isArray(categorySummary)
    ? categorySummary
    : Object.entries(categorySummary ?? {}).map(([category, amount]) => ({
        category,
        amount,
      }));

  if (entries.length === 0) {
    return (
      <p className="category-summary-empty">No category data available.</p>
    );
  }

  const total = entries.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  return (
    <div className="category-summary-list">
      {entries.map((item) => {
        const percentage = total > 0 ? (Number(item.amount) / total) * 100 : 0;

        return (
          <div className="category-summary-item" key={item.category}>
            <div className="category-summary-top">
              <span className="category-summary-name">{item.category}</span>

              <span className="category-summary-amount">
                {formatCurrency(item.amount)}
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
