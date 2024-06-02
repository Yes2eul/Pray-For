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
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const PostForm = () => {
  const auth = useAuth();
  const [postContent, setPostContent] = useState("");
  const router = useRouter("");

  const handlePostChange = (event) => {
    setPostContent(event.target.value);
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = auth.user;
      if (!user) {
        alert("로그인 후 이용 가능합니다.");
        router.push("/login");
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
      alert("등록되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handlePostSubmit} className={styles.post}>
      <textarea
        placeholder="감사와 기도제목을 나눠주세요."
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
