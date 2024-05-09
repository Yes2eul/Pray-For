"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();
  return (
    <header id="header">
      <div onClick={() => router.push("/")}>
        <h1>Pray For</h1>
      </div>
      <nav>
        <ul>
          <li onClick={() => router.push("/main")}>HOME</li>
          <li onClick={() => router.push("/")}>MYPAGE</li>
          <li onClick={() => router.push("/")}>LOGOUT</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
