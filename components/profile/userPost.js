"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import UseUserInfo from "@/hooks/useUserInfo";
import getTimeDifference from "@/hooks/getTimeDifference";

const UserPost = () => {
  const { user } = useAuth();
  const userPosts = UseUserInfo(user);

  return (
    <>
      {userPosts && (
        <ul>
          <div>Posts</div>
          {userPosts.posts.map((post, index) => (
            <li key={index}>
              <p>{post.postContent}</p>
              <p>{getTimeDifference(post.timestamp.toDate())}</p>
              <p>{post.likes.count}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default UserPost;
