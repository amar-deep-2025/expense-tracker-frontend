import { useState } from "react";
import { useLocation } from "react-router-dom";

import useVerifyOtp from "../../hooks/auth/useVerifyOtp";

import "./css/VerifyOtpForm.css";

const VerifyOtpForm = () => {
  const location = useLocation();
  const email = location.state?.email;

  const [formData, setFormData] = useState({
    otp: "",
  });

  const { verifyOtp, loading, error, success } = useVerifyOtp();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await verifyOtp({
        email: email,
        otp: formData.otp,
      });
    } catch (err) {
      console.log("OTP verification failed", err);
    }
  };

  return (
    <div className="verify-otp-card">
      <div className="verify-otp-header">
        <h1>Verify Your Email</h1>
        <p>Enter the OTP sent to your email address.</p>
      </div>

      <form className="verify-otp-form" onSubmit={handleSubmit}>
        <div className="verify-otp-field">
          <label htmlFor="otp">OTP</label>

          <input
            id="otp"
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
          />
        </div>

        <button className="verify-otp-button" type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {error && <p className="verify-otp-error">{error}</p>}

        {success && <p className="verify-otp-success">{success}</p>}
      </form>
    </div>
  );
};

export default VerifyOtpForm;
