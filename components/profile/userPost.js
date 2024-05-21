"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import UseUserInfo from "@/hooks/useUserInfo";
import getTimeDifference from "@/hooks/getTimeDifference";
import { useRouter } from "next/navigation";

const UserPost = () => {
  const { user } = useAuth();
  const userPosts = UseUserInfo(user);
  const router = useRouter();

  return (
    <>
      <button onClick={() => router.back()}>
        <p>{"<"}</p>
      </button>
      {userPosts && (
        <ul>
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
