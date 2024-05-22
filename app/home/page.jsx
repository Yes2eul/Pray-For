"use client";

import PostForm from "@/components/post/postForm";
import React from "react";
import styles from "./page.module.css";
import PostList from "@/components/post/postList";

const Home = () => {
  return (
    <div className={styles.box}>
      <div className={styles.input}>
        <PostForm />
      </div>
      <div className={styles.list}>
        <PostList />
      </div>
    </div>
  );
};

export default Home;
