"use client";

import UserPost from "@/components/profile/userPost";
import UserProfile from "@/components/profile/userProfile";
import React from "react";

const UserPage = () => {
  return (
    <>
      <div>
        <UserProfile />
        <UserPost />
      </div>
    </>
  );
};

export default UserPage;
