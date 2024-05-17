"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import UseUserInfo from "@/hooks/useUserInfo";

const UserProfile = () => {
  const router = useRouter();
  const { user } = useAuth();
  const userInfo = UseUserInfo(user);

  return (
    <>
      {userInfo && (
        <div>
          <p>Welcome, {userInfo.userName}</p>
          <p>Email: {userInfo.userEmail}</p>
          <p>DOB: {userInfo.dob}</p>
          <p>Church: {userInfo.church}</p>
        </div>
      )}
    </>
  );
};

export default UserProfile;
