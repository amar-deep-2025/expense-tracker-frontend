import { useState } from "react";
import { registerUser } from "../../services/auth/authService";
import { toast } from "react-toastify";
const useRegister = () => {
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);

  const register = async (userData) => {
    try {
      setLoading(true);
      // setError(null);
      // setSuccess(null);

      const response = await registerUser(userData);
      toast.success(response);
      return response;
    } catch (err) {
      toast.error(
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
  };
};

export default useRegister;
