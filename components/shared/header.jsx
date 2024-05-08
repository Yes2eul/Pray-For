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
    </header>
  );
};

export default Header;
