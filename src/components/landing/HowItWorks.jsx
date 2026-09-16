const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description:
        "Register your account and securely access your ExpenseTracker dashboard.",
    },
    {
      number: "02",
      title: "Track Your Finances",
      description:
        "Add your income and expenses and organize your transactions by category.",
    },
    {
      number: "03",
      title: "Manage Your Budget",
      description:
        "Set budgets and monitor your spending to understand where your money goes.",
    },
    {
      number: "04",
      title: "Get Financial Insights",
      description:
        "Use reports and the AI Financial Assistant to better understand your spending.",
    },
  ];

  return (
    <section id="how-it-works" className="landing-how-it-works">
      <div className="how-it-works-header">
        <span>HOW IT WORKS</span>

        <h2>
          Manage Your Finances in
          <span> Four Simple Steps</span>
        </h2>

        <p>
          Start tracking your finances and get a clearer view of your spending
          with ExpenseTracker.
        </p>
      </div>

      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-item" key={index}>
            <div className="step-number">{step.number}</div>

            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
