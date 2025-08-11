import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { usePosts } from "../contexts/PostsContext";

export default function PostWritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { createPost } = usePosts();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("로그인이 필요합니다");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error("제목과 내용을 모두 입력해주세요");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await createPost(title, content);
      if (result.success) {
        toast.success(result.message);
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("게시글 작성 중 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>글 작성</h2>
      <input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "작성 중..." : "작성"}
      </button>
    </form>
  );
}
