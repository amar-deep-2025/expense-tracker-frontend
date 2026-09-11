import { useState } from "react";

import usePassword from "../../hooks/auth/usePassword";

import "./css/forgotPasswordForm.css";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState({
    email: "",
  });

  const { forgot, loading, error, success } = usePassword();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgot(email);
    } catch (err) {
      console.log("Forgot password failed", err);
    }
  };

  return (
    <main className="forgot-password-page">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>

        <p className="forgot-password-description">
          Enter your registered email to receive a password reset link.
        </p>

        <div className="forgot-password-field">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            name="email"
            value={email.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <button
          className="forgot-password-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {error && <p className="password-error">{error}</p>}

        {success && <p className="password-success">{success}</p>}
      </form>
    </main>
  );
};

export default ForgotPasswordForm;
