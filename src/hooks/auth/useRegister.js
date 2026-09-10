import { useState } from "react";
import { registerUser } from "../../services/auth/authService";
const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await registerUser(userData);
      setSuccess(response);
      return response;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Registration failed",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    error,
    success,
  };
};

export default useRegister;
