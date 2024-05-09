"use client";

import { useRouter } from "next/navigation";
import React from "react";
// import ChurchIcon from "@/public/church.svg";

const Header = () => {
  const router = useRouter();
  return (
    <header id="header">
      <div onClick={() => router.push("/")}>
        <h1>Pray For</h1>
        {/* <ChurchIcon width="33" height="33" /> */}
      </div>
    </header>
  );
};

export default Header;
