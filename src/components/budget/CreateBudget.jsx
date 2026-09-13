import { useState } from "react";
import { toast } from "react-toastify";

import useBudget from "../../hooks/budget/useBudget";
import "./css/CreateBudget.css";

const CreateBudget = () => {
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    month: "",
    year: "",
    type: "OVERALL",
  });

  const { create, loading } = useBudget();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await create({
        ...formData,
        budget: Number(formData.budget),
        month: Number(formData.month),
        year: Number(formData.year),
        type: "OVERALL",
        categoryId: null,
      });

      toast.success("Budget created successfully");

      setFormData({
        name: "",
        budget: "",
        month: "",
        year: "",
        type: "OVERALL",
      });
    } catch (err) {
      console.error("Failed to create budget", err);
    }
  };

  return (
    <div className="create-budget">
      <div className="create-budget-header">
        <h2>Create Budget</h2>
        <p>Add your monthly budget details</p>
      </div>

      <form className="create-budget-form" onSubmit={handleSubmit}>
        <div className="create-budget-field">
          <label htmlFor="name">Budget Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter budget name"
          />
        </div>

        <div className="create-budget-field">
          <label htmlFor="budget">Budget Amount</label>
          <input
            id="budget"
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Enter budget amount"
          />
        </div>

        <div className="create-budget-field">
          <label htmlFor="month">Month</label>
          <input
            id="month"
            type="number"
            name="month"
            min="1"
            max="12"
            value={formData.month}
            onChange={handleChange}
            placeholder="Enter month (1-12)"
          />
        </div>

        <div className="create-budget-field">
          <label htmlFor="year">Year</label>
          <input
            id="year"
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Enter year"
          />
        </div>

        <div className="create-budget-field">
          <label htmlFor="type">Budget Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="OVERALL">Overall</option>
          </select>
        </div>

        <button
          className="create-budget-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Budget"}
        </button>
      </form>
    </div>
  );
};

export default CreateBudget;
