import { useState } from "react";

import useDashboard from "../hooks/useDashboard";
import useTopCategory from "../hooks/useTopCategory";
import useMonthlyComparison from "../hooks/useMonthlyComparison";
import useMonthlySummary from "../hooks/useMonthlySummary";

import formatCurrency from "../utils/formatCurrency";

import SummaryCard from "../components/dashboard/SummaryCard";
import CategorySummary from "../components/dashboard/CategorySummary";
import RecentExpenses from "../components/dashboard/RecentExpenses";
import AIInsight from "../components/dashboard/AIinsight";
import TopCategory from "../components/dashboard/topCategory";
import MonthlyComparison from "../components/dashboard/MonthlyComparison";
import MonthlySummary from "../components/dashboard/MonthlySummary";

import { getDashboardSummaryByDate } from "../services/dashboardService";

import { Wallet, ArrowDown, PieChart, Clock3, Scale } from "lucide-react";

import useLogout from "../hooks/auth/useLogout";

import "./css/Dashboard.css";

const Dashboard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [filteredDashboard, setFilteredDashboard] = useState(null);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filterError, setFilterError] = useState(null);

  const { data, loading, error, refetch } = useDashboard();

  const {
    data: topCategory,
    loading: topCategoryLoading,
    error: topCategoryError,
    refetch: refetchTopCategory,
  } = useTopCategory();

  const {
    data: monthlyComparison,
    loading: monthlyComparisonLoading,
    error: monthlyComparisonError,
    refetch: refetchMonthlyComparison,
  } = useMonthlyComparison();

  const {
    data: monthlySummary,
    loading: monthlySummaryLoading,
    error: monthlySummaryError,
    refetch: refetchMonthlySummary,
  } = useMonthlySummary(selectedYear);

  const { logout, loading: logoutLoading, error: logoutError } = useLogout();

  const handleDashboardFilter = async () => {
    if (!startDate || !endDate) {
      setFilterError("Please select both start and end dates.");
      return;
    }

    if (startDate > endDate) {
      setFilterError("Start date must be before end date.");
      return;
    }

    try {
      setFilterLoading(true);
      setFilterError(null);

      const start = `${startDate}T00:00:00`;
      const end = `${endDate}T23:59:59`;

      const response = await getDashboardSummaryByDate(start, end);

      setFilteredDashboard(response);
    } catch (err) {
      setFilterError(err.message || "Failed to filter dashboard");
    } finally {
      setFilterLoading(false);
    }
  };

  const handleMonthlySummaryFilter = () => {
    setSelectedYear(year);
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

  const dashboardData = filteredDashboard ?? data;

  /*
   * Top category:
   *
   * Normal dashboard:
   *    useTopCategory API
   *
   * Filtered dashboard:
   *    derive from filtered categorySummary
   */
  const filteredTopCategory = Object.entries(
    dashboardData.categorySummary ?? {},
  ).reduce(
    (top, [category, amount]) =>
      Number(amount) > Number(top.amount)
        ? {
            category,
            amount: Number(amount),
          }
        : top,
    {
      category: "",
      amount: 0,
    },
  );

  const topCategoryData = filteredDashboard ? filteredTopCategory : topCategory;

  const topCategoryIsLoading = filteredDashboard ? false : topCategoryLoading;

  const topCategoryErrorMessage = filteredDashboard ? null : topCategoryError;

  return (
    <main className="Dashboard">
      {/* Dashboard Header */}

      <section className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-welcome">
            <h1>Good Morning! 👋</h1>

            <p>Here's your financial overview for the selected period.</p>
          </div>

          <AIInsight aiInsight={dashboardData.aiInsight} />

          <button type="button" onClick={logout} disabled={logoutLoading}>
            {logoutLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </section>

      {/* Dashboard Date Filter */}

      <section className="dashboard-section">
        <h4>Filter Dashboard</h4>

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

          <button
            type="button"
            onClick={handleDashboardFilter}
            disabled={filterLoading}
          >
            {filterLoading ? "Applying..." : "Apply"}
          </button>
        </div>

        {filterError && <p className="filter-error">{filterError}</p>}
      </section>

      {/* Financial Summary */}

      <section className="dashboard-section">
        <div className="summary-cards">
          <SummaryCard
            title="Total Income"
            value={formatCurrency(dashboardData.totalIncome)}
            icon={Wallet}
            variant="income"
            subtitle="Total income"
          />

          <SummaryCard
            title="Total Expense"
            value={formatCurrency(dashboardData.totalExpense)}
            icon={ArrowDown}
            variant="expense"
            subtitle={`This month: ${formatCurrency(
              dashboardData.monthlyExpense,
            )}`}
          />

          <SummaryCard
            title="Total Budget"
            value={formatCurrency(dashboardData.totalBudget)}
            icon={PieChart}
            variant="budget"
            subtitle="Overall budget"
          />

          <SummaryCard
            title="Remaining Budget"
            value={formatCurrency(dashboardData.budgetRemaining)}
            icon={Clock3}
            variant="remaining"
            subtitle="Available budget"
          />

          <SummaryCard
            title="Current Balance"
            value={formatCurrency(dashboardData.balance)}
            icon={Scale}
            variant={dashboardData.balance < 0 ? "balance negative" : "balance"}
            subtitle={`Today: ${formatCurrency(dashboardData.todayExpense)}`}
          />
        </div>
      </section>

      {/* Category Summary */}

      <section className="dashboard-section">
        <h4>Category Summary</h4>

        <CategorySummary
          categorySummary={dashboardData.categorySummary}
          formatCurrency={formatCurrency}
        />
      </section>

      {/* Recent Expenses */}

      <section className="dashboard-section">
        <h4>Recent Expenses</h4>

        <RecentExpenses
          expenses={dashboardData.recentExpenses}
          formatCurrency={formatCurrency}
        />
      </section>

      {/* Top Spending Category */}

      <section className="dashboard-section">
        <h4>Top Spending Category</h4>

        <TopCategory
          topCategory={topCategoryData}
          loading={topCategoryIsLoading}
          error={topCategoryErrorMessage}
          refetch={refetchTopCategory}
          formatCurrency={formatCurrency}
        />
      </section>

      {/* Monthly Comparison */}

      <section className="dashboard-section">
        <h4>Last Month Comparison</h4>

        <MonthlyComparison
          monthlyComparison={monthlyComparison}
          loading={monthlyComparisonLoading}
          error={monthlyComparisonError}
          refetch={refetchMonthlyComparison}
          formatCurrency={formatCurrency}
        />
      </section>

      {/* Monthly Income & Expense */}

      <div className="dashboard-two-column">
        <section className="dashboard-section">
          <h4>Monthly Income & Expense</h4>

          <div className="monthly-summary-filter">
            <input
              type="number"
              className="monthly-summary-filter-input"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />

            <button
              type="button"
              className="monthly-summary-filter-button"
              onClick={handleMonthlySummaryFilter}
            >
              Apply
            </button>
          </div>

          <MonthlySummary
            monthlySummary={monthlySummary}
            loading={monthlySummaryLoading}
            error={monthlySummaryError}
            refetch={refetchMonthlySummary}
            formatCurrency={formatCurrency}
          />
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
