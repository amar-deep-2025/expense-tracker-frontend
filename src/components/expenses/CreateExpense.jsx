import { useState } from "react";
import { toast } from "react-toastify";

import useExpense from "../../hooks/expense/useExpense.js";
import "./css/CreateExpense.css";
import { validationCreateExpense } from "../../utils/validation/expenseValidation.js";

const CreateExpense = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    categoryName: "",
    description: "",
    type: "",
  });

  const { create, loading } = useExpense();

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
      await create({
        ...formData,
        amount: Number(formData.amount),
      });

      toast.success("Expense created successfully");

      setFormData({
        name: "",
        amount: "",
        categoryName: "",
        description: "",
        type: "",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to create expense",
      );
    }
  };

  return (
    <div className="create-expense">
      <div className="create-expense-header">
        <h2>Add Expense/Income</h2>
        <p>Add your expense or income details</p>
      </div>

      <form className="create-expense-form" onSubmit={handleSubmit}>
        <div className="expense-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter the expense or income name"
          />
        </div>

        <div className="expense-field">
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

        <div className="expense-field">
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

        <div className="expense-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>

        <div className="expense-field">
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
          className="create-expense-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Expense"}
        </button>
      </form>
    </div>
  );
};

export default CreateExpense;
