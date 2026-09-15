import { useState } from "react";
import {
  getCurrentUser,
  uploadProfileImage,
  updateProfile,
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
  return {
    user,
    getMe,
    uploadImage,
    update,
    loading,
    error,
  };
};
export default useUser;
