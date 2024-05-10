import React from "react";

const UserProfile = ({ user }) => {
  if (!user) {
    return <p>Loading user information...</p>;
  }

  return (
    <div>
      <p>Welcome, {user.userName}</p>
      <p>UID: {user.uid}</p>
      <p>Email: {user.userEmail}</p>
      <p>dob: {user.dob}</p>
      <p>church: {user.church}</p>
    </div>
  );
};

export default UserProfile;
