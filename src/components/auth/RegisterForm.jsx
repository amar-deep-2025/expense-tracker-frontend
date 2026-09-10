import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useRegister from "../../hooks/auth/useRegister";

import "./css/RegistrationForm.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();

  const { register, loading, error, success } = useRegister();

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
      await register(formData);

      navigate("/verify-otp", {
        state: {
          email: formData.email,
        },
      });
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <div className="register-card">
      <div className="register-header">
        <h1>Create Account</h1>
        <p>Register to start managing your expenses.</p>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="register-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="register-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <div className="register-field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91XXXXXXXXXX"
          />
        </div>

        <button className="register-button" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Create Account"}
        </button>

        {error && <p className="register-error">{error}</p>}

        {success && <p className="register-success">{success}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
