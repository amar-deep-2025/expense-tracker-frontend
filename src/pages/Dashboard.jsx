import { useState } from "react";
import useDashboard from "../hooks/useDashboard";
import formatCurrency from "../utils/formatCurrency";
import SummaryCard from "../components/dashboard/SummaryCard";
import { Wallet, ArrowDown, PieChart, Clock3, Scale } from "lucide-react";
import "./css/Dashboard.css";
import CategorySummary from "../components/dashboard/CategorySummary";
import RecentExpenses from "../components/dashboard/RecentExpenses";
import AIInsight from "../components/dashboard/AIinsight";
import { getCategorySummary } from "../services/dashboardService";

const Dashboard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [filteredCategories, setFilteredCategories] = useState(null);

  const { data, loading, error, refetch } = useDashboard();

  const handleCategoryFilter = async () => {
    if (!startDate || !endDate) {
      return;
    }
    try {
      const start = `${startDate}T00:00:00`;
      const end = `${endDate}T23:59:59`;

      const response = await getCategorySummary(start, end);
      setFilteredCategories(response);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <div>Loading dashboard...</div>;
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

  if (!data) {
    return <div>No dashboard data available.</div>;
  }
  console.log("Dashboard Data:" + data);
  console.log("Recent Expenses: " + data.recentExpenses);
  return (
    <main className="Dashboard">
      <section className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-welcome">
            <h1>Good Morning! 👋</h1>
            <p>Here's your financial overview for the selected period.</p>
          </div>

          <AIInsight aiInsight={data.aiInsight} />
        </div>
      </section>
      {/* Financial Summary */}
      <section className="dashboard-section">
        <div className="summary-cards">
          <SummaryCard
            title="Total Income"
            value={formatCurrency(data.totalIncome)}
            icon={Wallet}
            variant="income"
            subtitle="Total income"
          />

          <SummaryCard
            title="Total Expense"
            value={formatCurrency(data.totalExpense)}
            icon={ArrowDown}
            variant="expense"
            subtitle={`This month: ${formatCurrency(data.monthlyExpense)}`}
          />

          <SummaryCard
            title="Total Budget"
            value={formatCurrency(data.totalBudget)}
            icon={PieChart}
            variant="budget"
            subtitle="Overall budget"
          />

          <SummaryCard
            title="Remaining Budget"
            value={formatCurrency(data.budgetRemaining)}
            icon={Clock3}
            variant="remaining"
            subtitle="Available budget"
          />

          <SummaryCard
            title="Current Balance"
            value={formatCurrency(data.balance)}
            icon={Scale}
            variant={data.balance < 0 ? "balance negative" : "balance"}
            subtitle={`Today: ${formatCurrency(data.todayExpense)}`}
          />
        </div>
      </section>
      <section className="dashboard-section">
        <h4>Category Summary</h4>
        <div className="category-filter">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button type="button" onClick={handleCategoryFilter}>
            Apply
          </button>
        </div>
        <CategorySummary
          categorySummary={filteredCategories ?? data.categorySummary}
          formatCurrency={formatCurrency}
        />
      </section>

      <section className="dashboard-section">
        <h4>Recent Expenses</h4>
        <RecentExpenses
          expenses={data.recentExpenses}
          formatCurrency={formatCurrency}
        />
      </section>
    </main>
  );
};

export default Dashboard;
