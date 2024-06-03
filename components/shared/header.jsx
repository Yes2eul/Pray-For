"use client";

import { useRouter } from "next/navigation";
import React from "react";
import styles from "./header.module.css";
import { useAuth } from "@/hooks/useAuth";
import LogoutBtn from "../profile/logoutBtn";

const Header = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const handleLogout = LogoutBtn();

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
      <div onClick={handleLogoClick} className={styles.logo}>
        <img src="/logo.png" />
      </div>

      <nav>
        <ul>
          <li onClick={() => handleNavigation("/about")}>ABOUT</li>
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
