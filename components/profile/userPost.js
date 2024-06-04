"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import UseUserInfo from "@/hooks/useUserInfo";
import getTimeDifference from "@/hooks/getTimeDifference";
import styles from "./userPost.module.css";
import EditPost from "../post/editPost";

const UserPost = () => {
  const { user } = useAuth();
  const userPosts = UseUserInfo(user);
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [editingPost, setEditingPost] = useState(null);

  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
  };

  const handleEditClick = (post) => {
    setEditingPost(post);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  const handleSaveEdit = () => {
    setEditingPost(null);
    alert("수정되었습니다.");
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        {userPosts && userPosts.posts.length > 0 ? (
          <>
            <ul className={styles.postList}>
              {userPosts.posts.slice(0, visiblePosts).map((post, index) => (
                <li key={index} className={styles.post}>
                  {editingPost && editingPost.postId === post.postId ? (
                    <EditPost
                      post={post}
                      userId={user.uid}
                      onCancel={handleCancelEdit}
                      onSave={handleSaveEdit}
                    />
                  ) : (
                    <>
                      <div className={styles.editIcon}>
                        <img
                          src="/edit.png"
                          onClick={() => handleEditClick(post)}
                        />
                      </div>
                      <p className={styles.content}>{post.postContent}</p>
                      <div className={styles.details}>
                        <p>{getTimeDifference(post.timestamp.toDate())}</p>
                        <p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width="20"
                            height="20"
                            className={styles.icon}
                          >
                            <path d="M216.67,69.61c-9.38-3.8-19.63,2.83-25.7,16.77L135,248.54a4.9,4.9,0,0,0-.27,1.61V394.86l-42.63,40a4.95,4.95,0,0,0,6.78,7.21L143.1,400.6a5,5,0,0,0,1.56-3.6V251L200.17,90c3-6.92,8.36-13,12.82-11.18,9.28,3.7,13.41,10.91,13.45,22.7L212.61,204.05A25.37,25.37,0,0,0,175.33,226L172,257.54l-9.6,76.09a4.93,4.93,0,0,0,4.29,5.52,5,5,0,0,0,5.52-4.28l9.61-76.2,3.35-32.19a15.38,15.38,0,0,1,8.15-13.67,15.08,15.08,0,0,1,15.65.57,33.56,33.56,0,0,1,4,3.05l.16.14c8.78,7.83,13.22,20,13.22,36.4V378.31a38.44,38.44,0,0,1-6.77,21.83l-24.37,35.57a4.95,4.95,0,0,0,8.16,5.59l24.37-35.58a48.26,48.26,0,0,0,8.5-27.41V253c0-18.25-4.92-32.33-14.63-42l14.63-108.81C236.29,85.76,229.69,74.81,216.67,69.61Z" />
                            <path d="M419.86,434.9l-42.63-40V250.15a4.9,4.9,0,0,0-.27-1.61L320.9,86c-5.94-13.57-16.19-20.19-25.57-16.4-13,5.2-19.61,16.15-19.57,33.19L290.35,211c-9.71,9.68-14.63,23.76-14.63,42V378.31a48.26,48.26,0,0,0,8.5,27.41L308.6,441.3a4.95,4.95,0,1,0,8.16-5.59l-24.38-35.57a38.44,38.44,0,0,1-6.77-21.83V253c0-16.33,4.43-28.53,13.17-36.35l.25-.23a34.62,34.62,0,0,1,4-3,15.16,15.16,0,0,1,15.67-.56A15.63,15.63,0,0,1,326.85,227l3.33,31.77,9.59,76.1a4.94,4.94,0,0,0,9.81-1.24l-9.58-76-3.29-31.16a25.09,25.09,0,0,0-13.3-22.34,24.79,24.79,0,0,0-24-.09l-13.79-101.9c0-12.45,4.13-19.66,13.4-23.38,4.57-1.68,9.81,4.29,12.69,10.83L367.34,251V397a5,5,0,0,0,1.56,3.6l44.18,41.51a4.95,4.95,0,0,0,6.78-7.21Z" />
                          </svg>

                          {post.likes.count}
                        </p>
                      </div>
                    </>
                  )}
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
          <p className={styles.loading}>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserPost;
