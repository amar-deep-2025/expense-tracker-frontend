import { useState } from "react";

import usePassword from "../../hooks/auth/usePassword";

import "./css/forgotPasswordForm.css";
import { toast } from "react-toastify";
import { validationForgotPassword } from "../../utils/validation/authValidation";
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
    const errors = validationForgotPassword(email);
    if (Object.keys(errors).length > 0) {
      toast.error(Object.values(errors)[0]);
      return;
    }

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
            type="text"
            name="email"
            value={email.email}
            onChange={handleChange}
            placeholder="Enter your email"
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
