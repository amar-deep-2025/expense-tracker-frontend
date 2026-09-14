import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ExpensePage from "./pages/Expense/ExpensePage";
import ExpensesPage from "./pages/Expense/ExpensesPage";
import ExpenseDetailsPage from "./pages/Expense/ExpenseDetailsPage";
import "./index.css";
import UpdateExpensePage from "./pages/Expense/UpdateExpensePage";
import CreateBudgetPage from "./pages/Budget/CreateBudgetPage";
import BudgetsPage from "./pages/Budget/BudgetsPage";
import BudgetDetailsPage from "./pages/Budget/BudgetDetailsPage";
import UpdateBudgetPage from "./pages/Budget/UpdateBudgetPage";
import Reports from "./components/report/Reports";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/expenses/:id" element={<ExpenseDetailsPage />} />,
        <Route path="expenses/:id/edit" element={<UpdateExpensePage />} />
        <Route path="/budget" element={<CreateBudgetPage />} />
        <Route path="/budgets" element={<BudgetsPage />} />
        <Route path="/budgets/:id" element={<BudgetDetailsPage />} />,
        <Route path="budgets/:id/edit" element={<UpdateBudgetPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
