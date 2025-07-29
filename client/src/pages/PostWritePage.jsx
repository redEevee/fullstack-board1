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
    navigate("/board");
  };

  return (
    <section className="tm-section tm-section-small">
      <div className="tm-content-box">
        <h2 className="tm-text-primary mb-4">글 작성</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-3" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="form-control mb-3" placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
          <button type="submit" className="btn btn-success btn-block">작성</button>
        </form>
      </div>
    </section>
  );
}
