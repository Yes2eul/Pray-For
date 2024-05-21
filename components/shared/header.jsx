"use client";

import { useRouter } from "next/navigation";
import React from "react";
import styles from "./header.module.css";
import { auth } from "@/utils/firebase";
import { removeAuthTokenFromSession } from "@/utils/setToken";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      if (isLoggedIn) {
        await auth.signOut();
        removeAuthTokenFromSession();
        alert("로그아웃 되었습니다.");
        router.push("/");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleNavigation = (path) => {
    if (isLoggedIn) {
      router.push(path);
    } else {
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
          {isLoggedIn ? (
            <li onClick={() => handleNavigation(`/${user.uid}`)}>MYPAGE</li>
          ) : (
            <li onClick={() => handleNavigation("/login")}>LOGIN</li>
          )}
          <li onClick={handleLogout}>LOGOUT</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
