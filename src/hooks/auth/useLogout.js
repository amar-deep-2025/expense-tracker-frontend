import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth/authService";
import { toast } from "react-toastify";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      setLoading(true);

      await logoutUser();

      localStorage.removeItem("token");

      toast.success("Logout successful");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.response?.data || "Logout failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    logout,
    loading,
  };
};

export default useLogout;
