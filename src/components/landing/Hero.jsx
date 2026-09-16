import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="landing-hero">
      {/* Left Content */}
      <div className="hero-content">
        <span className="hero-badge">Smart. Simple. Personal.</span>

        <h1>
          Take Control
          <br />
          of Your
          <span> Finances</span>
        </h1>

        <p>
          Track your expenses, manage your budget, and get AI-powered insights
          to make smarter financial decisions.
        </p>

        <div className="hero-actions">
          <button
            className="hero-primary-btn"
            onClick={() => navigate("/register")}
          >
            Get Started Free →
          </button>

          <button
            className="hero-secondary-btn"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </div>

        <div className="hero-trust">
          <div>
            <span>✓</span>
            Free to use
          </div>

          <div>
            <span>✓</span>
            Secure & Private
          </div>

          <div>
            <span>✓</span>
            AI-Powered
          </div>
        </div>
      </div>

      {/* Right Dashboard Preview */}
      <div className="hero-visual">
        <div className="hero-laptop">
          <div className="laptop-top-bar">
            <div className="window-controls">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="laptop-screen">
            <img src="/dashboard.png" alt="ExpenseTracker Dashboard" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
