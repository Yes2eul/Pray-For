"use client";

import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/useAuth";

const UserProfile = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user && user.uid) {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserData(userData);
          } else {
            setUserData(null);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div>
      {userData ? (
        <>
          <p>Welcome, {userData.userName}</p>
          <p>Email: {userData.userEmail}</p>
          <p>DOB: {userData.dob}</p>
          <p>Church: {userData.church}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
