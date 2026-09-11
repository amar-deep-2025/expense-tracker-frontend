import { useState } from "react";

import { loginUser } from "../../services/auth/authService";
import { Rss } from "lucide-react";

const useLoginUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const login = async (loginData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await loginUser(loginData);
      localStorage.setItem("token", response.token);
      setSuccess("Login successful");

      return response;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "User Login Failed",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
    success,
  };
};

export default useLoginUser;
