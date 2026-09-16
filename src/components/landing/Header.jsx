import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return (
    <header className="landing-header">
      <div className="landing-logo" onClick={() => navigate("/")}>
        ExpenseTracker
      </div>

      <nav className="landing-nav">
        <a href="#features">Features</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#preview">Preview</a>
      </nav>

      <div className="landing-header-actions">
        {token ? (
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>

            <button onClick={() => navigate("/register")}>Get Started</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
