import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import useExpense from "../../hooks/expense/useExpense";
import { validationCreateExpense } from "../../utils/validation/expenseValidation";
import "./css/UpdateExpense.css";

const UpdateExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    categoryName: "",
    description: "",
    type: "",
  });

  const { getById, update, loading } = useExpense();

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await getById(id);

        setFormData({
          name: response.name || "",
          amount: response.amount || "",
          categoryName: response.category || "",
          description: response.description || "",
          type: response.type || "",
        });
      } catch (err) {
        console.log("Failed to fetch expense", err);
      }
    };

    fetchExpense();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validationCreateExpense(formData);

    if (Object.keys(errors).length > 0) {
      toast.error(Object.values(errors)[0]);
      return;
    }

    try {
      await update(id, {
        ...formData,
        amount: Number(formData.amount),
      });

      toast.success("Expense updated successfully");

      setTimeout(() => {
        navigate(`/expenses/${id}`);
      }, 1500);
    } catch (err) {
      console.log("Failed to update expense", err);

      toast.error(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to update expense",
      );
    }
  };

  return (
    <div className="update-expense-page">
      <div className="update-expense-card">
        <div className="update-expense-header">
          <h2>Update Transaction</h2>
          <p>Update your expense or income details</p>
        </div>

        <form className="update-expense-form" onSubmit={handleSubmit}>
          <div className="update-expense-field">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter expense or income name"
            />
          </div>

          <div className="update-expense-field">
            <label htmlFor="amount">Amount</label>

            <input
              id="amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
            />
          </div>

          <div className="update-expense-field">
            <label htmlFor="categoryName">Category</label>

            <input
              id="categoryName"
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              placeholder="Enter category"
            />
          </div>

          <div className="update-expense-field">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </div>

          <div className="update-expense-field">
            <label htmlFor="type">Type</label>

            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select type</option>
              <option value="EXPENSE">EXPENSE</option>
              <option value="INCOME">INCOME</option>
            </select>
          </div>

          <button
            className="update-expense-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateExpense;
