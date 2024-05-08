import React, { useState } from "react";

const PostForm = () => {
  const [post, setPost] = useState("");

  const handlePostChange = (event) => {
    setPost(event.target.value);
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();
    //
  };

  return (
    <form onSubmit={handlePostSubmit} id="post-form">
      <input
        placeholder="감사 or 기도제목을 나눠주세요."
        type="text"
        id="post"
        name="post"
        value={post}
        onChange={handlePostChange}
        required
      />

      <button type="submit">등록</button>
    </form>
  );
};

export default PostForm;
