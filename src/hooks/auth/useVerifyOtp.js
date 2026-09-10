import { useState } from "react";
import { verifyOtp as verifyOtpRequest } from "../../services/auth/authService";

const useVerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const verifyOtp = async (requestData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await verifyOtpRequest(requestData);

      setSuccess(response);

      return response;
    } catch (err) {
      setError(
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
    error,
    success,
  };
};

export default useVerifyOtp;
