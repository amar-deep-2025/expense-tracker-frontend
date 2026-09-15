import { useState } from "react";
import {
  getCurrentUser,
  uploadProfileImage,
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
  return {
    user,
    getMe,
    uploadImage,
    loading,
    error,
  };
};
export default useUser;
