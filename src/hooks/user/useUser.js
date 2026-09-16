import { useState } from "react";
import {
  getCurrentUser,
  uploadProfileImage,
  updateProfile,
  changeEmail,
  verifyEmailChange,
  changePassword,
  verifyPasswordChange,
} from "../../services/user/userService";
const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMe = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getCurrentUser();
      setUser(data);
      return data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "failed to fetch user profile",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const uploadImage = async (file) => {
    try {
      setLoading(true);
      setError(null);

      const data = await uploadProfileImage(file);

      return data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to upload profile image",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };
  const update = async (profileData) => {
    try {
      setLoading(true);
      setError(null);

      const data = await updateProfile(profileData);

      setUser(data);

      return data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to update profile",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };
  const changeUserEmail = async (newEmail) => {
    try {
      setLoading(true);
      setError(null);

      const data = await changeEmail(newEmail);

      return data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to change email",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyUserEmailChange = async (otp) => {
    try {
      setLoading(true);
      setError(null);

      const data = await verifyEmailChange(otp);

      setUser(data);

      return data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to verify email",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };
  const changeUserPassword = async (oldPassword, newPassword) => {
    try {
      setLoading(true);
      setError(null);

      const data = await changePassword(oldPassword, newPassword);

      return data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to change password",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyUserPasswordChange = async (otp) => {
    try {
      setLoading(true);
      setError(null);

      const data = await verifyPasswordChange(otp);

      return data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to verify password",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return {
    user,
    getMe,
    uploadImage,
    update,
    changeUserEmail,
    verifyUserEmailChange,
    changeUserPassword,
    verifyUserPasswordChange,
    loading,
    error,
  };
};
export default useUser;
