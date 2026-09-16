import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import useBudget from "../../hooks/budget/useBudget";

import "./css/UpdateBudget.css";

const UpdateBudget = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    month: "",
    year: "",
    type: "OVERALL",
  });

  const { getById, update, loading } = useBudget();

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await getById(id);

        setFormData({
          name: response.name || "",
          budget: response.budget || "",
          month: response.month || "",
          year: response.year || "",
          type: response.type || "OVERALL",
        });
      } catch (err) {
        console.log("Failed to fetch budget", err);
      }
    };

    fetchBudget();
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

    try {
      await update(id, {
        ...formData,
        budget: Number(formData.budget),
        month: Number(formData.month),
        year: Number(formData.year),
        type: "OVERALL",
        categoryId: null,
      });

      toast.success("Budget updated successfully");

      setTimeout(() => {
        navigate(`/budgets/${id}`);
      }, 1500);
    } catch (err) {
      console.log("Failed to update budget", err);

      toast.error(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to update budget",
      );
    }
  };

  return (
    <div className="update-budget-page">
      <div className="update-budget-card">
        <div className="update-budget-header">
          <h2>Update Budget</h2>
          <p>Update your budget details</p>
        </div>

        <form className="update-budget-form" onSubmit={handleSubmit}>
          <div className="update-budget-field">
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

          <div className="update-budget-field">
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

          <div className="update-budget-field">
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

          <div className="update-budget-field">
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

          <div className="update-budget-field">
            <label htmlFor="type">Budget Type</label>

            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="OVERALL">OVERALL</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Budget"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBudget;
