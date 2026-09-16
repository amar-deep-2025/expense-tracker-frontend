const DashboardPreview = () => {
  return (
    <section id="preview" className="landing-dashboard-preview">
      <div className="preview-header">
        <span>PRODUCT PREVIEW</span>

        <h2>
          See Your Finances
          <span> at a Glance</span>
        </h2>

        <p>
          Get a clear overview of your income, expenses, budgets, and financial
          activity from a single dashboard.
        </p>
      </div>

      <div className="preview-container">
        <div className="preview-window">
          <div className="preview-window-bar">
            <div className="window-controls">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="window-title">ExpenseTracker</div>
          </div>

          <div className="preview-image">
            <img src="/dashboard.png" alt="ExpenseTracker Dashboard Preview" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
