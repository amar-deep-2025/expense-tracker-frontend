import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useUser from "../../hooks/user/useUser";
import "./css/Profile.css";
import formatDateTime from "../../utils/formatDateTime";

const Profile = () => {
  const { user, getMe, uploadImage, loading, error } = useUser();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    getMe();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setSelectedFile(file);

    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image");
      return;
    }

    try {
      await uploadImage(selectedFile);

      toast.success("Profile image uploaded successfully");

      setSelectedFile(null);

      await getMe();
    } catch (err) {
      console.error("Profile image upload failed", err);

      toast.error(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to upload profile image",
      );
    }
  };

  if (loading && !user) {
    return <p>Loading profile...</p>;
  }

  if (error && !user) {
    return <p>{error}</p>;
  }

  return (
    <div className="profile-page">
      <h2>Profile</h2>

      {user && (
        <div className="profile-card">
          {/* Profile Image */}
          {(previewUrl || user.profileImage) && (
            <img
              src={
                previewUrl ||
                `${import.meta.env.VITE_API_BASE_URL}/uploads/${user.profileImage}`
              }
              alt="Profile"
              className="profile-image"
            />
          )}

          {/* Image Upload */}
          <div className="profile-image-upload">
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <button
              type="button"
              onClick={handleUpload}
              disabled={loading || !selectedFile}
            >
              {loading ? "Uploading..." : "Upload Image"}
            </button>
          </div>

          {/* User Information */}
          <p>
            <strong>Name:</strong> {user.name}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Phone:</strong> {user.phone}
          </p>

          <p>
            <strong>Role:</strong> {user.role}
          </p>

          <p>
            <strong>Created At:</strong> {formatDateTime(user.createdAt)}
          </p>

          <p>
            <strong>Updated At:</strong> {formatDateTime(user.updatedAt)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
