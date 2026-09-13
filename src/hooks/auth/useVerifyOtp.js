import { useState } from "react";
import { verifyOtp as verifyOtpRequest } from "../../services/auth/authService";
import { toast } from "react-toastify";
const useVerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);

  const verifyOtp = async (requestData) => {
    try {
      setLoading(true);
      // setError(null);
      // setSuccess(null);

      const response = await verifyOtpRequest(requestData);

      toast.success(response.message);

      localStorage.setItem("token", response.token);

      return response;
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data ||
          "OTP Verification Failed",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    verifyOtp,
    loading,
  };
};

export default useVerifyOtp;
