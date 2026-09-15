import { useEffect } from "react";
import useUser from "../../hooks/user/useUser";
import "./css/Profile.css";
import formatDateTime from "../../utils/formatDateTime";
const Profile = () => {
  const { user, getMe, loading, error } = useUser();

  useEffect(() => {
    getMe();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="profile-page">
      <h2>Profile</h2>

      {user && (
        <div className="profile-card">
          {user.profileImage && (
            <img
              src={user.profileImage}
              alt="Profile"
              width="120"
              height="120"
            />
          )}

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
