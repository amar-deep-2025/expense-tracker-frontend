import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="landing-cta">
      <div className="cta-content">
        <span>GET STARTED</span>

        <h2>
          Take the First Step Towards
          <span> Better Financial Management</span>
        </h2>

        <p>
          Start tracking your expenses, managing your budgets, and understanding
          your spending today.
        </p>

        <div className="cta-actions">
          <button
            className="cta-primary-btn"
            onClick={() => navigate("/register")}
          >
            Create Free Account
          </button>

          <button
            className="cta-secondary-btn"
            onClick={() => navigate("/login")}
          >
            Already Have an Account?
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
