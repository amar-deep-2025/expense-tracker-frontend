import { useState } from "react";
import useLoginUser from "../../hooks/auth/useLoginUser";
import { useNavigate } from "react-router-dom";
import "./css/LoginForm.css";
import { toast } from "react-toastify";
import { validationLogin } from "../../utils/validation/authValidation";
import { FaEyeSlash, FaEye } from "react-icons/fa";
const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, loading, error, success } = useLoginUser();
  const [showPassword, setShowPassword] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validationLogin(loginData);
    if (Object.keys(errors).length > 0) {
      toast.error(Object.values(errors)[0]);
      return;
    }
    try {
      await login(loginData);
      navigate("/dashboard");
    } catch (err) {
      console.log("Login failed", err);
    }
  };

  return (
    <div className="login-card">
      <div className="login-header">
        <h1>Welcome Back</h1>
        <p>Login to manage your expenses.</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-field">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="text"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="login-field">
          <label htmlFor="password">Password</label>

          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button className="login-button" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="login-error">{error}</p>}
        {success && <p className="login-success">{success}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
