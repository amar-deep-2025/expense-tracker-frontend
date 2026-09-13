import { useEffect } from "react";
import useExpense from "../../hooks/expense/useExpense";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  const { getAll, loading, error } = useExpense();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getAll();
        setExpenses(response);
      } catch (err) {
        console.log("failed to fetch expenses", err);
      }
    };
    fetchExpenses();
  }, []);

  if (loading) {
    return <p>Expense Loading</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <h2>All expenses</h2>
      {expenses.length == 0 ? (
        <p>No expenses found</p>
      ) : (
        expenses.map((expense) => (
          <div key={expense.id}>
            <h3>{expense.name}</h3>
            <p>Amount: ₹{expense.amount}</p>
            <p>Type: {expense.type}</p>
            <p>Category: {expense.category}</p>
            <p>Description: {expense.description}</p>
            <p>Created At: {new Date(expense.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};
export default ExpenseList;
