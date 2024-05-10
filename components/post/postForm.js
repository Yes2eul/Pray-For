import React, { useState } from "react";
import styles from "./post.module.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/utils/firebase";

const PostForm = () => {
  const [postContent, setPostContent] = useState("");
  const [likes, setLikes] = useState(0);

  const handlePostChange = (event) => {
    setPostContent(event.target.value);
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, `users/${user.userId}/posts`), {
        postId: post.uid,
        postContent: postContent,
        timestamp: serverTimestamp(),
        likes: likes,
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
