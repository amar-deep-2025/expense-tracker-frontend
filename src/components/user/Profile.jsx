import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useUser from "../../hooks/user/useUser";
import "./css/Profile.css";
import formatDateTime from "../../utils/formatDateTime";

const Profile = () => {
  const {
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
  } = useUser();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  // -------------------------
  // Change Email
  // -------------------------

  const [isChangingEmail, setIsChangingEmail] = useState(false);

  const [emailData, setEmailData] = useState({
    newEmail: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);

  // -------------------------
  // Change Password
  // -------------------------

  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    otp: "",
  });

  const [passwordOtpSent, setPasswordOtpSent] = useState(false);

  useEffect(() => {
    getMe();
  }, []);

  // -------------------------
  // Profile Image
  // -------------------------

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

  // -------------------------
  // Update Profile
  // -------------------------

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

  // -------------------------
  // Change Email
  // -------------------------

  const handleEmailChange = (e) => {
    const { name, value } = e.target;

    setEmailData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendEmailOtp = async (e) => {
    e.preventDefault();

    const newEmail = emailData.newEmail.trim();

    if (!newEmail) {
      toast.error("New email is required");
      return;
    }

    if (newEmail === user.email) {
      toast.error("New email must be different from current email");
      return;
    }

    try {
      await changeUserEmail(newEmail);

      toast.success("OTP sent to your new email");

      setOtpSent(true);
    } catch (err) {
      console.error("Change email failed", err);

      toast.error(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to send OTP",
      );
    }
  };

  const handleVerifyEmailOtp = async (e) => {
    e.preventDefault();

    const otp = emailData.otp.trim();

    if (!otp) {
      toast.error("OTP is required");
      return;
    }

    try {
      await verifyUserEmailChange(otp);

      toast.success("Email changed successfully");

      setEmailData({
        newEmail: "",
        otp: "",
      });

      setOtpSent(false);
      setIsChangingEmail(false);

      await getMe();
    } catch (err) {
      console.error("Email verification failed", err);

      toast.error(
        err.response?.data?.message || err.response?.data || "Invalid OTP",
      );
    }
  };

  const handleCancelEmailChange = () => {
    setIsChangingEmail(false);
    setOtpSent(false);

    setEmailData({
      newEmail: "",
      otp: "",
    });
  };

  // -------------------------
  // Change Password
  // -------------------------

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendPasswordOtp = async (e) => {
    e.preventDefault();

    const oldPassword = passwordData.oldPassword.trim();
    const newPassword = passwordData.newPassword.trim();
    const confirmPassword = passwordData.confirmPassword.trim();

    if (!oldPassword) {
      toast.error("Old password is required");
      return;
    }

    if (!newPassword) {
      toast.error("New password is required");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (!confirmPassword) {
      toast.error("Confirm password is required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (oldPassword === newPassword) {
      toast.error("New password must be different from old password");
      return;
    }

    try {
      await changeUserPassword(oldPassword, newPassword);

      toast.success("OTP sent to your email");

      setPasswordOtpSent(true);
    } catch (err) {
      console.error("Change password failed", err);

      toast.error(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to send OTP",
      );
    }
  };

  const handleVerifyPasswordOtp = async (e) => {
    e.preventDefault();

    const otp = passwordData.otp.trim();

    if (!otp) {
      toast.error("OTP is required");
      return;
    }

    try {
      await verifyUserPasswordChange(otp);

      toast.success("Password changed successfully");

      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        otp: "",
      });

      setPasswordOtpSent(false);
      setIsChangingPassword(false);
    } catch (err) {
      console.error("Password verification failed", err);

      toast.error(
        err.response?.data?.message || err.response?.data || "Invalid OTP",
      );
    }
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordOtpSent(false);

    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      otp: "",
    });
  };

  // -------------------------
  // Loading / Error
  // -------------------------

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

          {/* Change Email */}

          <div className="change-email-section">
            {!isChangingEmail ? (
              <button
                type="button"
                onClick={() => setIsChangingEmail(true)}
                className="change-email-button"
              >
                Change Email
              </button>
            ) : (
              <div className="change-email-form">
                <h3>Change Email</h3>

                {!otpSent ? (
                  <form onSubmit={handleSendEmailOtp}>
                    <div className="profile-field">
                      <label htmlFor="newEmail">New Email</label>

                      <input
                        id="newEmail"
                        type="email"
                        name="newEmail"
                        value={emailData.newEmail}
                        onChange={handleEmailChange}
                        placeholder="Enter new email"
                      />
                    </div>

                    <div className="email-actions">
                      <button
                        type="submit"
                        disabled={loading}
                        className="save-profile-button"
                      >
                        {loading ? "Sending..." : "Send OTP"}
                      </button>

                      <button
                        type="button"
                        onClick={handleCancelEmailChange}
                        className="cancel-profile-button"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyEmailOtp}>
                    <p className="otp-message">
                      OTP has been sent to your new email.
                    </p>

                    <div className="profile-field">
                      <label htmlFor="emailOtp">OTP</label>

                      <input
                        id="emailOtp"
                        type="text"
                        name="otp"
                        value={emailData.otp}
                        onChange={handleEmailChange}
                        placeholder="Enter OTP"
                      />
                    </div>

                    <div className="email-actions">
                      <button
                        type="submit"
                        disabled={loading}
                        className="save-profile-button"
                      >
                        {loading ? "Verifying..." : "Verify OTP"}
                      </button>

                      <button
                        type="button"
                        onClick={handleCancelEmailChange}
                        className="cancel-profile-button"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Change Password */}

          <div className="change-password-section">
            {!isChangingPassword ? (
              <button
                type="button"
                onClick={() => setIsChangingPassword(true)}
                className="change-password-button"
              >
                Change Password
              </button>
            ) : (
              <div className="change-password-form">
                <h3>Change Password</h3>

                {!passwordOtpSent ? (
                  <form onSubmit={handleSendPasswordOtp}>
                    <div className="profile-field">
                      <label htmlFor="oldPassword">Old Password</label>

                      <input
                        id="oldPassword"
                        type="password"
                        name="oldPassword"
                        value={passwordData.oldPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter old password"
                      />
                    </div>

                    <div className="profile-field">
                      <label htmlFor="newPassword">New Password</label>

                      <input
                        id="newPassword"
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                      />
                    </div>

                    <div className="profile-field">
                      <label htmlFor="confirmPassword">
                        Confirm New Password
                      </label>

                      <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                      />
                    </div>

                    <div className="password-actions">
                      <button
                        type="submit"
                        disabled={loading}
                        className="save-profile-button"
                      >
                        {loading ? "Sending..." : "Send OTP"}
                      </button>

                      <button
                        type="button"
                        onClick={handleCancelPasswordChange}
                        className="cancel-profile-button"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyPasswordOtp}>
                    <p className="otp-message">
                      OTP has been sent to your email.
                    </p>

                    <div className="profile-field">
                      <label htmlFor="passwordOtp">OTP</label>

                      <input
                        id="passwordOtp"
                        type="text"
                        name="otp"
                        value={passwordData.otp}
                        onChange={handlePasswordChange}
                        placeholder="Enter OTP"
                      />
                    </div>

                    <div className="password-actions">
                      <button
                        type="submit"
                        disabled={loading}
                        className="save-profile-button"
                      >
                        {loading ? "Verifying..." : "Verify OTP"}
                      </button>

                      <button
                        type="button"
                        onClick={handleCancelPasswordChange}
                        className="cancel-profile-button"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
