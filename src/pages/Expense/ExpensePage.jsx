import CreateExpense from "../../components/expenses/CreateExpense.jsx";
import ExpenseList from "../../components/expenses/expenseList.jsx";
const ExpensePage = () => {
  return (
    <main className="create-expense-page">
      <CreateExpense />
      <ExpenseList />
    </main>
  );
};

export default ExpensePage;
