import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useUser from "../../hooks/user/useUser";
import "./css/Profile.css";
import formatDateTime from "../../utils/formatDateTime";

const Profile = () => {
  const { user, getMe, uploadImage, update, loading, error } = useUser();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

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
      setPreviewUrl(null);

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

  const handleEdit = () => {
    setFormData({
      name: user.name || "",
      phone: user.phone || "",
    });

    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("Phone is required");
      return;
    }

    try {
      await update(formData);

      toast.success("Profile updated successfully");

      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed", err);

      toast.error(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to update profile",
      );
    }
  };

  const handleCancel = () => {
    setIsEditing(false);

    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
    });
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

          {/* Profile Information */}
          {isEditing ? (
            <form onSubmit={handleUpdate} className="profile-edit-form">
              <div className="profile-field">
                <label htmlFor="name">Name</label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="profile-field">
                <label htmlFor="phone">Phone</label>

                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone"
                />
              </div>

              <div className="profile-edit-actions">
                <button
                  type="submit"
                  disabled={loading}
                  className="save-profile-button"
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="cancel-profile-button"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
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

              <button
                type="button"
                onClick={handleEdit}
                className="edit-profile-button"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
