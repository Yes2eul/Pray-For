"use client";

import React from "react";
import styles from "./userPost.module.css";

const PostActions = () => {
  return (
    <div className={styles.postAction}>
      <button>수정</button>
      <button>삭제</button>
    </div>
  );
};

export default PostActions;
