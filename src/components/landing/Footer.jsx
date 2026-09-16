const Footer = () => {
  return (
    <footer className="landing-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>ExpenseTracker</h3>

          <p>
            A simple and smart way to track expenses, manage budgets, and
            understand your finances.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#preview">Preview</a>
          </div>

          <div>
            <h4>Account</h4>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ExpenseTracker. All rights reserved.</p>

        <p>Built with React & Spring Boot</p>
      </div>
    </footer>
  );
};

export default Footer;
