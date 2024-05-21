"use client";

import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import getTimeDifference from "@/hooks/getTimeDifference";

const PostList = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [sortBy, setSortBy] = useState("desc"); // 최신순

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const usersDB = await getDocs(collection(db, "users"));
        let posts = [];

        usersDB.forEach((doc) => {
          const userData = doc.data();
          if (userData.posts) {
            const userPosts = userData.posts.map((post) => ({
              ...post,
              userName: maskName(userData.userName),
            }));
            posts = [...posts, ...userPosts];
          }
        });

        if (sortBy === "asc") {
          posts.sort((a, b) => a.timestamp - b.timestamp);
        } else {
          posts.sort((a, b) => b.timestamp - a.timestamp);
        }

        setAllPosts(posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllPosts();
  }, [sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const maskName = (name) => {
    return name.charAt(0) + "*".repeat(name.length - 1);
  };

  const countLikes = (index) => {
    // 좋아요
  };

  return (
    <>
      <select value={sortBy} onChange={handleSortChange}>
        <option value="desc">최신순</option>
        <option value="asc">오래된순</option>
      </select>
      <div>
        {allPosts.length > 0 ? (
          <ul>
            {allPosts.map((post, index) => (
              <li key={index}>
                <p>{post.userName}</p>
                <p>{post.postContent}</p>
                <p>{getTimeDifference(post.timestamp.toDate())}</p>
                <button onClick={() => countLikes(index)}>
                  기도 {post.likes.count}
                </button>
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

export default PostList;
