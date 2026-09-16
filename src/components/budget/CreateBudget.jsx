import { useState, useEffect } from "react";

import { toast } from "react-toastify";

import useBudget from "../../hooks/budget/useBudget";
import useCategory from "../../hooks/category/useCategory";

import "./css/CreateBudget.css";

const CreateBudget = () => {
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    month: "",
    year: "",
    type: "OVERALL",
    categoryId: "",
  });

  const { create, loading } = useBudget();

  const { categories, getAll, loading: categoryLoading } = useCategory();

  useEffect(() => {
    if (formData.type === "CATEGORY") {
      getAll().catch((err) => {
        console.log("Failed to fetch categories", err);
      });
    }
  }, [formData.type]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Budget name is required");
      return;
    }

    if (!formData.budget || Number(formData.budget) <= 0) {
      toast.error("Budget amount must be greater than 0");
      return;
    }

    if (
      !formData.month ||
      Number(formData.month) < 1 ||
      Number(formData.month) > 12
    ) {
      toast.error("Please enter a valid month");
      return;
    }

    if (!formData.year) {
      toast.error("Year is required");
      return;
    }

    if (formData.type === "CATEGORY" && !formData.categoryId) {
      toast.error("Please select a category");
      return;
    }

    try {
      await create({
        ...formData,
        budget: Number(formData.budget),
        month: Number(formData.month),
        year: Number(formData.year),
        type: formData.type,
        categoryId:
          formData.type === "CATEGORY" ? Number(formData.categoryId) : null,
      });

      toast.success("Budget created successfully");

      setFormData({
        name: "",
        budget: "",
        month: "",
        year: "",
        type: "OVERALL",
        categoryId: "",
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
            <option value="CATEGORY">Category</option>
          </select>
        </div>

        {formData.type === "CATEGORY" && (
          <div className="create-budget-field">
            <label htmlFor="categoryId">Category</label>

            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              disabled={categoryLoading}
            >
              <option value="">
                {categoryLoading ? "Loading categories..." : "Select category"}
              </option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

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
