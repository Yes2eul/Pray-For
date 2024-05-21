"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import UseUserInfo from "@/hooks/useUserInfo";
import getTimeDifference from "@/hooks/getTimeDifference";
import { useRouter } from "next/navigation";
import styles from "./userPost.module.css";

const UserPost = () => {
  const { user } = useAuth();
  const userPosts = UseUserInfo(user);
  const router = useRouter();

  return (
    <>
      <div className={styles.container}>
        <button onClick={() => router.back()} className={styles.backButton}>
          <p>{"<"}</p>
        </button>
        {userPosts ? (
          <ul className={styles.postList}>
            {userPosts.posts.map((post, index) => (
              <li key={index} className={styles.post}>
                <p className={styles.content}>{post.postContent}</p>
                <div className={styles.details}>
                  <p>{getTimeDifference(post.timestamp.toDate())}</p>
                  <p>{post.likes.count}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default UserPost;
