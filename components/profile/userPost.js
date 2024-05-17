"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import UseUserInfo from "@/hooks/useUserInfo";
import useTimeDifference from "@/hooks/useTimeDifference";

const UserPost = () => {
  const { user } = useAuth();
  const userPosts = UseUserInfo(user);

  return (
    <>
      {userPosts && (
        <ul>
          <div>Posts:</div>
          {userPosts.posts.map((post, index) => (
            <li key={index}>
              <p>Content: {post.postContent}</p>
              <p>date: {useTimeDifference(post.timestamp)}</p>
              <p>likes: {post.likes.count}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default UserPost;
