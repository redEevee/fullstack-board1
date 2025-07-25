import React from "react";

export default function PostItem({ post }) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
}
