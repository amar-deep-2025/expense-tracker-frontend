import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const getHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authorization token not found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};
export const getCurrentUser = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
    headers: getHeaders(),
  });
  return response.data;
};

export const uploadProfileImage = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post(
    `${API_BASE_URL}/api/users/upload-image`,
    formData,
    {
      headers: getHeaders(),
    },
  );
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/users/me`,
    profileData,
    {
      headers: getHeaders(),
    },
  );
  return response.data;
};
