"use client";

import { useRouter } from "next/navigation";
import React from "react";
import styles from "./header.module.css";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/utils/firebase";
import { removeAuthTokenFromSession } from "@/utils/setToken";

const Header = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      if (isLoggedIn) {
        await auth.signOut();
        removeAuthTokenFromSession();
        alert("로그아웃 되었습니다.");
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigation = (path) => {
    if (isLoggedIn) {
      router.push(path);
    } else {
      router.push("/login");
    }
  };

  const handleLogoClick = () => {
    if (isLoggedIn) {
      router.push("/home");
    } else {
      router.push("/");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo.png" onClick={handleLogoClick} />
      </div>

      <nav>
        <ul>
          <li>
            <span onClick={() => handleNavigation("/about")}>ABOUT</span>
          </li>
          <li>
            <span onClick={() => handleNavigation("/home")}>HOME</span>
          </li>
          {isLoggedIn ? (
            <li>
              <span onClick={() => handleNavigation(`/${user.uid}`)}>
                MYPAGE
              </span>
            </li>
          ) : (
            <li>
              <span onClick={() => handleNavigation("/login")}>LOGIN</span>
            </li>
          )}
          <li>
            <span onClick={handleLogout}>LOGOUT</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
