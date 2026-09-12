import { useState } from "react";

import { loginUser } from "../../services/auth/authService";
import { Rss } from "lucide-react";
import { toast } from "react-toastify";

const useLoginUser = () => {
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);

  const login = async (loginData) => {
    try {
      setLoading(true);
      // setError(null);
      // setSuccess(null);

      const response = await loginUser(loginData);
      localStorage.setItem("token", response.token);

      toast.success("Login successful");

      return response;
    } catch (err) {
      toast.error(
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
  };
};

export default useLoginUser;
