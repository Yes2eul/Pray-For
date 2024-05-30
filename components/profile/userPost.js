"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import UseUserInfo from "@/hooks/useUserInfo";
import getTimeDifference from "@/hooks/getTimeDifference";
import styles from "./userPost.module.css";

const UserPost = () => {
  const { user } = useAuth();
  const userPosts = UseUserInfo(user);
  const [visiblePosts, setVisiblePosts] = useState(6);

  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
  };

  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        {userPosts && userPosts.posts.length > 0 ? (
          <>
            <ul className={styles.postList}>
              {userPosts.posts.slice(0, visiblePosts).map((post, index) => (
                <li key={index} className={styles.post}>
                  <p className={styles.content}>{post.postContent}</p>
                  <div className={styles.details}>
                    <p>{getTimeDifference(post.timestamp.toDate())}</p>
                    <p>{post.likes.count}</p>
                  </div>
                </li>
              ))}
            </ul>
            {visiblePosts < userPosts.posts.length && (
              <div className={styles.moreBtn}>
                <button
                  onClick={loadMorePosts}
                  className={styles.loadMoreButton}
                >
                  더 보기
                </button>
              </div>
            )}
          </>
        ) : (
          <p>작성된 기도제목이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default UserPost;
