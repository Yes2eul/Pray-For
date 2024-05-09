"use client";

import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <header id="header">
      <div onClick={() => router.push("/")}>
        <h1>Pray For</h1>
      </div>
      <nav>
        <ul>
          <li onClick={() => router.push("/main")}>HOME</li>
          <li>MYPAGE</li>
          <li onClick={handleLogout}>LOGOUT</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
