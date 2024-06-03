"use client";

import { useRouter } from "next/navigation";
import React from "react";
import styles from "./header.module.css";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();

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
      <div onClick={handleLogoClick}>
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
          <li>ABOUT</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
