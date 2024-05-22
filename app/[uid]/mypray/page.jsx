"use client";

import BackButton from "@/components/profile/backBtn";
import UserPost from "@/components/profile/userPost";
import React from "react";
import styles from "./page.module.css";

const MyPray = () => {
  return (
    <div className={styles.box}>
      <div className={styles.back}>
        <BackButton />
      </div>
      <div className={styles.list}>
        <UserPost />
      </div>
    </div>
  );
};

export default MyPray;
