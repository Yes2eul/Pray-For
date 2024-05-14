"use client";

import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const router = useRouter();
  const uid = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (uid) {
          const userRef = collection(db, "users");
          const querySnapshot = await getDocs(where(userRef, "uid", "==", uid));

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              setUser(doc.data());
            });
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [uid]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>Welcome, {user.userName}</p>
      <p>Email: {user.userEmail}</p>
      <p>DOB: {user.dob}</p>
      <p>Church: {user.church}</p>
    </div>
  );
};

export default UserProfile;
