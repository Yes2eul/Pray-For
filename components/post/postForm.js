"use client";

import React, { useState } from "react";
import styles from "./post.module.css";
import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useAuth } from "@/utils/useAuth";

const PostForm = () => {
  const auth = useAuth();
  const [postContent, setPostContent] = useState("");

  const handlePostChange = (event) => {
    setPostContent(event.target.value);
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = auth.user;
      if (!user) {
        alert("사용자가 로그인되지 않았습니다.");
      }

      const newPost = {
        postId: doc(collection(db, "posts")).id,
        postContent: postContent,
        timestamp: Timestamp.now(),
        likes: {
          count: 0,
          likedUsers: [],
        },
      };

      await updateDoc(doc(db, `users/${user.uid}`), {
        posts: arrayUnion(newPost),
      });

      setPostContent("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handlePostSubmit} className={styles.post}>
      <input
        placeholder="감사 or 기도제목을 나눠주세요."
        type="text"
        id="post"
        name="post"
        value={postContent}
        onChange={handlePostChange}
        required
      />

      <button type="submit">등록</button>
    </form>
  );
};

export default PostForm;
