import "./css/TopCategory.css";

const TopCategory = ({
  topCategory,
  loading,
  error,
  refetch,
  formatCurrency,
}) => {
  if (loading) {
    return <p>Loading top category...</p>;
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

  if (!topCategory) {
    return <p>Unable to find top category.</p>;
  }

  return (
    <div className="top-category">
      <span>{topCategory.category}</span>

      <span>{formatCurrency(topCategory.amount)}</span>
    </div>
  );
};

export default TopCategory;
