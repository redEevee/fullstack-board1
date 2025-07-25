import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/postApi";

export default function PostWritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({ title, content });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>글 작성</h2>
      <input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">작성</button>
    </form>
  );
}
