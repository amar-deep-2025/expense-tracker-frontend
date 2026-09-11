import { useState } from "react";

import { forgotPassword, resetPassword } from "../../services/auth/authService";

const usePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const forgot = async (email) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await forgotPassword(email);
      setSuccess("Reset link sent successfully");

      return response;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "forgot password is failed",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = async (data) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await resetPassword(data);
      setSuccess("Password reset Successfully");
      return response;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Password reset Failed",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    forgot,
    reset,
    loading,
    error,
    success,
  };
};

export default usePassword;
