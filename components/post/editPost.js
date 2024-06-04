"use client";

import React, { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import styles from "./editPost.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const EditPost = ({ post, onCancel, onSave }) => {
  const { user } = useAuth();
  const router = useRouter("");
  const [updatedContent, setUpdatedContent] = useState(post.postContent);

  const handleUpdateChange = (event) => {
    setUpdatedContent(event.target.value);
  };

  const handleUpdateSubmit = async () => {
    try {
      if (!user) {
        alert("로그인 후 이용 가능합니다.");
        router.push("/login");
      }

      const userRef = doc(db, `users/${user.uid}`);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userPosts = userDoc.data().posts;
        const updatedPosts = userPosts.map((p) =>
          p.postId === post.postId ? { ...p, postContent: updatedContent } : p
        );

        await updateDoc(userRef, { posts: updatedPosts });
        onSave();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.editForm}>
      <textarea
        value={updatedContent}
        onChange={handleUpdateChange}
        required
        className={styles.editTextarea}
      />
      <div>
        <img
          src="/done.png"
          alt="Save"
          className={styles.saveBtn}
          onClick={handleUpdateSubmit}
        />
        <img
          src="/close.png"
          alt="Cancel"
          onClick={onCancel}
          className={styles.cancelBtn}
        />
      </div>
    </form>
  );
};

export default EditPost;
