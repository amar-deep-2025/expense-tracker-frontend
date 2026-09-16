const Features = () => {
  const features = [
    {
      icon: "💰",
      title: "Expense Tracking",
      description:
        "Track your daily income and expenses in one organized place.",
    },
    {
      icon: "📊",
      title: "Budget Management",
      description:
        "Create and manage budgets to keep your spending under control.",
    },
    {
      icon: "📈",
      title: "Reports & Analytics",
      description:
        "Analyze your financial activity with detailed reports and insights.",
    },
    {
      icon: "🤖",
      title: "AI Financial Assistant",
      description:
        "Ask questions about your spending and get AI-powered financial insights.",
    },
    {
      icon: "🔐",
      title: "Secure Authentication",
      description:
        "Protect your account with secure authentication and password management.",
    },
    {
      icon: "📱",
      title: "Simple & Responsive",
      description:
        "Access your expense management dashboard through a clean responsive interface.",
    },
  ];

  return (
    <section id="features" className="landing-features">
      <div className="features-header">
        <span>FEATURES</span>

        <h2>
          Everything You Need to
          <span> Manage Your Money</span>
        </h2>

        <p>
          ExpenseTracker provides the tools you need to track, manage, and
          understand your personal finances.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
