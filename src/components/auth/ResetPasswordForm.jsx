import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import usePassword from "../../hooks/auth/usePassword";
import "./css/ResetPasswordForm.css";
import { toast } from "react-toastify";
import { validationResetPassword } from "../../utils/validation/authValidation";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState({
    newPassword: "",
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { reset, loading, error, success } = usePassword();

  const token = searchParams.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validationResetPassword(password);
    if (Object.keys(errors).length > 0) {
      toast.error(Object.values(errors)[0]);
      return;
    }
    try {
      await reset({
        token,
        newPassword: password.newPassword,
      });

      navigate("/login");
    } catch (err) {
      console.log("Password reset failed", err);
    }
  };

  return (
    <main className="reset-password-page">
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

        <p className="reset-password-description">
          Enter your new password below.
        </p>

        <div className="reset-password-field">
          <label htmlFor="newPassword">New Password</label>

          <input
            id="newPassword"
            type="password"
            name="newPassword"
            value={password.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </div>

        <button
          className="reset-password-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {error && <p className="password-error">{error}</p>}

        {success && <p className="password-success">{success}</p>}
      </form>
    </main>
  );
};

export default ResetPasswordForm;
