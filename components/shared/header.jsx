"use client";

import { useRouter } from "next/navigation";
import React from "react";
import styles from "./header.module.css";
import { removeAuthTokenFromSession } from "@/utils/auth";
import useUserInfo from "../../hooks/useUserInfo";
import { auth } from "@/utils/firebase";

const Header = () => {
  const router = useRouter();
  const user = useUserInfo();

  const handleLogout = async () => {
    try {
      if (user) {
        await auth.signOut();
        removeAuthTokenFromSession();
        alert("로그아웃 되었습니다.");
        router.push("/");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleNavigation = (path) => {
    if (user) {
      router.push(path);
    } else {
      alert("로그인 후 이용 가능합니다.");
      router.push("/login");
    }
  };

  return (
    <header className={styles.header}>
      <div onClick={() => router.push("/")}>
        <h1>Pray For</h1>
      </div>

      <nav>
        <ul>
          <li onClick={() => handleNavigation("/home")}>HOME</li>
          <li onClick={() => handleNavigation(`/${user.userId}`)}>MYPAGE</li>
          <li onClick={handleLogout}>LOGOUT</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
